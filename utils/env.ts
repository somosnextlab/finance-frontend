// utils/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    // URLs de upstreams (no exponer en cliente):
    AUTH_UPSTREAM_URL: z.string().url().default("https://auth.example.com"),
    PAYMENTS_UPSTREAM_URL: z.string().url().default("https://payments.example.com"),
    KYC_UPSTREAM_URL: z.string().url().default("https://kyc.example.com"),
    // Secretos:
    BFF_HMAC_SECRET: z.string().min(32).default("change_me_to_a_long_random_secret_32_chars_minimum"),
    BFF_JWT_PRIVATE_KEY: z.string().min(50).default("-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKB\n...\n-----END PRIVATE KEY-----"),
    COOKIE_NAME_AUTH: z.string().default("nl_auth"),
    COOKIE_DOMAIN: z.string().optional(),
    COOKIE_SECURE: z.enum(["true", "false"]).default("true"),
  },
  client: {
    NEXT_PUBLIC_APP_ENV: z.enum(["local", "dev", "stg", "prd"]).default("local"),
    NEXT_PUBLIC_APP_NAME: z.string().default("Financiera NextLab"),
    NEXT_PUBLIC_API_BASE: z.string().url().optional(), // opcional si se llama a /api relative
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AUTH_UPSTREAM_URL: process.env.AUTH_UPSTREAM_URL,
    PAYMENTS_UPSTREAM_URL: process.env.PAYMENTS_UPSTREAM_URL,
    KYC_UPSTREAM_URL: process.env.KYC_UPSTREAM_URL,
    BFF_HMAC_SECRET: process.env.BFF_HMAC_SECRET,
    BFF_JWT_PRIVATE_KEY: process.env.BFF_JWT_PRIVATE_KEY,
    COOKIE_NAME_AUTH: process.env.COOKIE_NAME_AUTH,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    COOKIE_SECURE: process.env.COOKIE_SECURE,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
  },
  skipValidation: false,
});
