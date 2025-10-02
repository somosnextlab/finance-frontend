import { Box, Container } from "@mui/material";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Implementar autorización de admin en Etapa 1
  return (
    <Box>
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}
