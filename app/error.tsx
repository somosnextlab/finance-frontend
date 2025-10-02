"use client";

import { Box, Button, Container, Typography } from "@mui/material";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Oops! Algo salió mal
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Ha ocurrido un error inesperado.
        </Typography>
        <Button variant="contained" onClick={reset}>
          Intentar de nuevo
        </Button>
      </Box>
    </Container>
  );
}
