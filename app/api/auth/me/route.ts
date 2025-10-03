import { jsonErr, jsonOk, requireAuth } from "@/app/api/_utils";

export async function GET() {
  try {
    requireAuth();
    // En etapa posterior: validar token contra upstream
    return jsonOk({ authenticated: true });
  } catch {
    return jsonErr("Unauthorized", 401);
  }
}
