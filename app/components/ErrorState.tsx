'use client';
import { Box, Typography, Button } from '@mui/material';
export default function ErrorState({ title='Ocurrió un error', onRetry }: { title?: string; onRetry?: () => void }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="40vh" gap={2}>
      <Typography variant="h6">{title}</Typography>
      {onRetry && <Button onClick={onRetry} variant="outlined">Reintentar</Button>}
    </Box>
  );
}
