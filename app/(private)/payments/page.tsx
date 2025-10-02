import AppShell from '@/app/components/AppShell';
import { Typography } from '@mui/material';
import EmptyState from '@/app/components/EmptyState';

export default function PaymentsPage() {
  return (
    <AppShell>
      <Typography variant="h3" gutterBottom>Pagos</Typography>
      <EmptyState 
        title="Sin pagos registrados"
        description="Aún no hay información de pagos disponible."
      />
    </AppShell>
  );
}
