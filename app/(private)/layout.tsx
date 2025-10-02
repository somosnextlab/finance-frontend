import { Box, Container } from "@mui/material";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Implementar autenticación en Etapa 1
  return (
    <Box>
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}
