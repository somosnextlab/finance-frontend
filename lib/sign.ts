// lib/sign.ts
import { createHmac, timingSafeEqual } from "crypto";

export function hmacSign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function hmacVerify(payload: string, signature: string, secret: string) {
  const calc = Buffer.from(hmacSign(payload, secret));
  const given = Buffer.from(signature);
  return calc.length === given.length && timingSafeEqual(calc, given);
}
