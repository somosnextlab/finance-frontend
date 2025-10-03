// service/api-client.ts
import { env } from "@/utils/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type FetcherOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  search?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  auth?: boolean; // si true, añade bearer desde cookie (servido por BFF)
  expectJSON?: boolean; // por defecto true
};

function buildUrl(path: string, search?: FetcherOptions["search"]) {
  // En desarrollo, usar URL relativa si no hay base configurada
  const base = (typeof window === "undefined" ? "" : (env.NEXT_PUBLIC_API_BASE ?? "")) || "";
  
  // Si no hay base configurada, usar URL relativa
  if (!base) {
    const url = new URL(path, window.location.origin);
    if (search) Object.entries(search).forEach(([k, v]) => v !== undefined && url.searchParams.set(k, String(v)));
    return url.toString();
  }
  
  const url = new URL(path, base);
  if (search) Object.entries(search).forEach(([k, v]) => v !== undefined && url.searchParams.set(k, String(v)));
  return url.toString();
}

export async function apiFetch<T = unknown>(path: string, opt: FetcherOptions = {}): Promise<T> {
  const { method = "GET", headers = {}, body, search, expectJSON = true } = opt;
  const url = buildUrl(path, search);

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
    // Importante: credenciales para que /api use cookie httpOnly (servidor)
    credentials: "include",
    cache: "no-store",
  });

  // Interceptor de errores
  const isJson = expectJSON && res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    const err = new Error((isJson ? (data as { message?: string })?.message : data) || `HTTP ${res.status}`);
    (err as Error & { status: number; payload: unknown }).status = res.status;
    (err as Error & { status: number; payload: unknown }).payload = data;
    throw err;
  }
  return data as T;
}
