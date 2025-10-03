import { jsonErr, jsonOk, requireAuth } from "@/app/api/_utils";
import { env } from "@/utils/env";

export async function POST(req: Request) {
  try {
    requireAuth();
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return jsonErr("file requerido", 400);

    if (process.env.NODE_ENV !== "production") {
      return jsonOk({ kyc_id: "dev_kyc_123", filename: file.name, size: file.size });
    }

    const upstream = await fetch(new URL("/upload", env.KYC_UPSTREAM_URL), {
      method: "POST",
      body: form, // si upstream necesita headers, añadirlos
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) return jsonErr(data?.message || "kyc upstream error", upstream.status);
    return jsonOk(data);
  } catch {
    return jsonErr("Bad request", 400);
  }
}
