// Design tokens para el sistema de diseño
// TODO: Expandir en Etapa 1 con tokens completos

export const tokens = {
  colors: {
    primary: {
      50: "#e3f2fd",
      100: "#bbdefb",
      500: "#2196f3",
      900: "#0d47a1",
    },
    secondary: {
      50: "#fce4ec",
      100: "#f8bbd9",
      500: "#e91e63",
      900: "#880e4f",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
} as const;
