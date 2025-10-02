import { Box, Container } from "@mui/material";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}
