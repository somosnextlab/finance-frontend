import { QueryClient } from "@tanstack/react-query";

let client: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: siempre crear un nuevo cliente
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minuto
          retry: 1,
        },
      },
    });
  }

  // Browser: crear cliente una sola vez
  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minuto
          retry: 1,
        },
      },
    });
  }

  return client;
}
