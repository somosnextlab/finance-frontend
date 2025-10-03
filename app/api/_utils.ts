import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@/utils/env";
import { hmacSign } from "@/lib/sign";

export function getAuthToken(): string | null {
  const c = cookies().get(env.COOKIE_NAME_AUTH);
  return c?.value ?? null;
}

export function requireAuth(): string | never {
  const token = getAuthToken();
  if (!token) throw new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  return token;
}

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, { status: 200, ...init });
}

export function jsonErr(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ message, ...(extra ?? {}) }, { status });
}

// Tipos para fetchWithHeader
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchWithHeaderOptions = {
  url: string;
  method?: HttpMethod;
  body?: BodyInit | Record<string, unknown>;
  authToken?: string;
  headersProps?: Record<string, string>;
  useHmac?: boolean; // Si debe firmar el body con HMAC
  upstreamType?: "auth" | "payments" | "kyc"; // Para determinar qué upstream usar
};

type ContentType = "json" | "text" | "zip" | "pdf" | "blob" | "unknown";

// Función para detectar tipo de contenido
function detectContentType(contentType: string | null): ContentType {
  if (!contentType) return "unknown";

  const type = contentType.toLowerCase();
  if (type.includes("application/json")) return "json";
  if (type.includes("text/")) return "text";
  if (type.includes("application/zip")) return "zip";
  if (type.includes("application/pdf")) return "pdf";
  if (type.includes("application/octet-stream")) return "blob";

  return "unknown";
}

// Función para obtener URL del upstream
function getUpstreamUrl(upstreamType: "auth" | "payments" | "kyc"): string {
  switch (upstreamType) {
    case "auth":
      return env.AUTH_UPSTREAM_URL;
    case "payments":
      return env.PAYMENTS_UPSTREAM_URL;
    case "kyc":
      return env.KYC_UPSTREAM_URL;
    default:
      throw new Error(`Upstream type ${upstreamType} not supported`);
  }
}

/**
 * Función adaptada para hacer fetch con headers de autenticación y proxies firmados
 * Compatible con la arquitectura BFF del proyecto
 */
export async function fetchWithHeader(options: FetchWithHeaderOptions): Promise<NextResponse> {
  const {
    url,
    method = "GET",
    body,
    authToken,
    headersProps = {},
    useHmac = false,
    upstreamType,
  } = options;

  // Construir headers base
  const headers: Record<string, string> = {
    Accept: "application/json;odata.metadata=minimal;odata.streaming=true",
    ...headersProps,
  };

  // Manejo de autenticación
  if (authToken) {
    headers.Authorization = authToken;
  } else {
    // Usar token de cookie si no se proporciona uno explícito
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  // Preparar body y headers de contenido
  let requestBody: BodyInit | undefined;
  let bodyString: string | undefined;

  if (body) {
    if (body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer) {
      // Para FormData, Blob, ArrayBuffer - no establecer Content-Type
      requestBody = body;
      delete headers["Content-Type"];
    } else if (typeof body === "object") {
      // Para objetos - serializar a JSON
      bodyString = JSON.stringify(body);
      requestBody = bodyString;
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }
    } else {
      // Para strings u otros tipos
      requestBody = body as BodyInit;
    }
  }

  // Agregar firma HMAC si es necesario
  if (useHmac && bodyString) {
    const signature = hmacSign(bodyString, env.BFF_HMAC_SECRET);
    headers["x-signature"] = signature;
  }

  // Construir URL completa si es necesario
  let fullUrl = url;
  if (upstreamType && !url.startsWith("http")) {
    const baseUrl = getUpstreamUrl(upstreamType);
    fullUrl = new URL(url, baseUrl).toString();
  }

  try {
    const response = await fetch(fullUrl, {
      method,
      headers,
      body: requestBody,
    });

    const contentType = response.headers.get("content-type");
    const detectedType = detectContentType(contentType);

    // Manejo específico por tipo de contenido
    switch (detectedType) {
      case "json": {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
      }

      case "text": {
        const data = await response.blob();
        return new NextResponse(data, {
          status: 200,
          headers: {
            "Content-Type": contentType ?? "text/plain",
          },
        });
      }

      case "zip": {
        const data = await response.blob();
        return new NextResponse(data, {
          status: 200,
          headers: {
            "Content-Type": "application/zip",
          },
        });
      }

      case "pdf": {
        const data = await response.blob();
        return new NextResponse(data, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
          },
        });
      }

      case "blob": {
        const data = await response.blob();
        return new NextResponse(data, {
          status: response.status,
          headers: {
            "Content-Type": contentType ?? "application/octet-stream",
          },
        });
      }

      default: {
        // Para status 204 (No Content) o contenido desconocido
        if (response.status === 204) {
          return NextResponse.json({}, { status: 200 });
        }

        // Fallback: intentar como JSON
        try {
          const data = await response.json();
          return NextResponse.json(data, { status: response.status });
        } catch {
          // Si no es JSON, devolver como texto
          const data = await response.text();
          return new NextResponse(data, { status: response.status });
        }
      }
    }
  } catch (error: unknown) {
    // Manejo de errores específicos
    if (error && typeof error === "object" && "cause" in error) {
      const cause = (error as { cause: { code?: string } }).cause;
      if (cause?.code === "ENOTFOUND") {
        return NextResponse.json(
          { message: "Servicio no disponible", error: "ENOTFOUND" },
          { status: 503 },
        );
      }
    }

    // Log solo en desarrollo
    if (process.env.NODE_ENV !== "test") {
      console.error("fetchWithHeader error:", error);
    }

    // Error genérico
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
