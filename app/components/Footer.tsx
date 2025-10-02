'use client';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', p: 1, textAlign: 'center' }}>
      <Typography variant="caption">© {new Date().getFullYear()} Financiera NextLab</Typography>
    </Box>
  );
}
