import { Box, Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="lg">
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
        <Typography variant="h2" component="h1" gutterBottom>
          Financiera NextLab
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Front listo
        </Typography>
      </Box>
    </Container>
  );
}
