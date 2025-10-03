import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@/utils/env";

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
