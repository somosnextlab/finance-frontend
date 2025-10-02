"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
export default function Loading({ label = "Cargando…" }: { label?: string }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="40vh"
      gap={2}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}
