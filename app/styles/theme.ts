import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

export const makeTheme = () =>
  extendTheme({
    cssVarPrefix: "nl", // nextlab
    colorSchemes: {
      light: {
        palette: {
          mode: "light",
          primary: { main: "#6366F1" },
          secondary: { main: "#0ea5e9" },
          success: { main: "#22c55e" },
          warning: { main: "#f59e0b" },
          error: { main: "#ef4444" },
          background: { default: "#F9FAFB", paper: "#FFFFFF" },
        },
      },
      dark: {
        palette: {
          mode: "dark",
          primary: { main: "#818CF8" },
          secondary: { main: "#38bdf8" },
          success: { main: "#22c55e" },
          warning: { main: "#f59e0b" },
          error: { main: "#f87171" },
          background: { default: "#0B1020", paper: "#0F162A" },
        },
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: "var(--font-sans)",
      h1: { fontSize: "2rem", fontWeight: 700 },
      h2: { fontSize: "1.6rem", fontWeight: 700 },
      h3: { fontSize: "1.25rem", fontWeight: 600 },
      body1: { fontSize: "1rem" },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiContainer: { defaultProps: { maxWidth: "lg" } },
      MuiButton: { defaultProps: { disableElevation: true } },
      MuiLink: { defaultProps: { underline: "hover" } },
    },
  });
