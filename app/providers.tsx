"use client";
import { ReactNode, useMemo, useState } from "react";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { makeTheme } from "@/app/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ColorSchemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var colorScheme = localStorage.getItem('nl-colorScheme') || 'system';
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var isDark = colorScheme === 'dark' || (colorScheme === 'system' && prefersDark);
              document.documentElement.setAttribute('data-mui-color-scheme', isDark ? 'dark' : 'light');
              document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
            } catch (e) {
              // Fallback to light mode
              document.documentElement.setAttribute('data-mui-color-scheme', 'light');
              document.documentElement.style.colorScheme = 'light';
            }
          })();
        `,
      }}
    />
  );
}

export default function AppProviders({ children }: { children: ReactNode }) {
  const theme = useMemo(() => makeTheme(), []);
  const [queryClient] = useState(() => new QueryClient());
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CssVarsProvider>
  );
}
