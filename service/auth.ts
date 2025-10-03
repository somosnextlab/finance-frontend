// service/auth.ts
import { apiFetch } from "@/app/service/api-client";

export const me = () => apiFetch<{ authenticated: boolean }>("/api/auth/me");

export const login = (email: string, password: string) => 
  apiFetch("/api/auth/login", { method: "POST", body: { email, password } });

export const logout = () => 
  apiFetch("/api/auth/logout", { method: "POST" });
