import AppShell from '@/app/components/AppShell';
import { Typography, Button } from '@mui/material';

export default function Page() {
  return (
    <AppShell>
      <Typography variant="h3" gutterBottom>Bienvenido</Typography>
      <Typography variant="body1" gutterBottom>Front listo con layout, tema y componentes base.</Typography>
      <Button variant="contained">CTA</Button>
    </AppShell>
  );
}
