"use client";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorScheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Tooltip title="Alternar tema">
        <IconButton aria-label="alternar tema">
          <DarkModeIcon />
        </IconButton>
      </Tooltip>
    );
  }

  const isDark = mode === "dark";
  return (
    <Tooltip title={isDark ? "Modo claro" : "Modo oscuro"}>
      <IconButton aria-label="alternar tema" onClick={() => setMode(isDark ? "light" : "dark")}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
