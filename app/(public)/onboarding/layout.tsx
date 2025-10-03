import { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: 'Onboarding - Finance App',
  description: 'Proceso de alta de cliente',
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Alta de Cliente
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Completa tu información para comenzar
          </Typography>
        </Box>
        {children}
      </Container>
    </Box>
  );
}
