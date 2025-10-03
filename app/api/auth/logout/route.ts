import { NextResponse } from "next/server";
import { env } from "@/utils/env";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(env.COOKIE_NAME_AUTH, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
