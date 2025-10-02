'use client';
import { Box, Typography } from '@mui/material';
export default function EmptyState({ title='Sin datos', description='Aún no hay información disponible.' }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="40vh" gap={1}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
    </Box>
  );
}
