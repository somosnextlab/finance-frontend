import AppShell from "@/app/components/AppShell";
import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  // Aquí se podrían hidratar datos críticos con React Query (SSR en etapa futura)
  return <AppShell>{children}</AppShell>;
}
