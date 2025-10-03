import { NextRequest, NextResponse } from "next/server";
import { env } from "@/utils/env";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ message: "Bad request" }, { status: 400 });

  // Proxy a AUTH upstream (mock en dev)
  if (process.env.NODE_ENV !== "production") {
    // Simulación: token corto firmado por upstream (falso)
    const mockToken = `dev.${Buffer.from(email).toString("base64url")}.token`;
    const res = NextResponse.json({ user: { email }, token: "set-in-cookie" }, { status: 200 });
    res.cookies.set(env.COOKIE_NAME_AUTH, mockToken, {
      httpOnly: true, sameSite: "lax", secure: env.COOKIE_SECURE === "true",
      path: "/", domain: env.COOKIE_DOMAIN || undefined, maxAge: 60 * 60 * 8,
    });
    return res;
  }

  const upstream = await fetch(new URL("/login", env.AUTH_UPSTREAM_URL), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await upstream.json().catch(() => ({}));
  if (!upstream.ok) return NextResponse.json({ message: data?.message || "Auth failed" }, { status: upstream.status });

  const token = data?.token as string;
  const res = NextResponse.json({ user: data?.user, token: "set-in-cookie" }, { status: 200 });
  res.cookies.set(env.COOKIE_NAME_AUTH, token, {
    httpOnly: true, sameSite: "lax", secure: env.COOKIE_SECURE === "true",
    path: "/", domain: env.COOKIE_DOMAIN || undefined, maxAge: 60 * 60 * 8,
  });
  return res;
}
