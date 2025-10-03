import { jsonErr, jsonOk, requireAuth } from "@/app/api/_utils";
import { env } from "@/utils/env";
import { hmacSign } from "@/lib/sign";

export async function POST(req: Request) {
  try {
    requireAuth(); // 401 si no hay cookie
    const payload = await req.json();
    if (!payload?.amount || !payload?.currency) return jsonErr("amount/currency requeridos", 400);

    const bodyStr = JSON.stringify(payload);
    const signature = hmacSign(bodyStr, env.BFF_HMAC_SECRET);

    if (process.env.NODE_ENV !== "production") {
      // Smoke: devolvería un intent simulado
      return jsonOk({ intent_id: "dev_intent_123", signature, echo: payload });
    }

    const upstream = await fetch(new URL("/intent", env.PAYMENTS_UPSTREAM_URL), {
      method: "POST",
      headers: { "content-type": "application/json", "x-signature": signature },
      body: bodyStr,
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) return jsonErr(data?.message || "payments upstream error", upstream.status);
    return jsonOk(data);
  } catch (e: unknown) {
    if (e instanceof Response) return e;
    return jsonErr("Bad request", 400);
  }
}
