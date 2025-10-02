'use client';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        <IconButton edge="start" aria-label="menu" sx={{ mr: 1, display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Financiera NextLab</Typography>
        <Box><ThemeToggle /></Box>
      </Toolbar>
    </AppBar>
  );
}
