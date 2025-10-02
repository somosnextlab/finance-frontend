'use client';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';

const items = [
  { href: '/', icon: <HomeIcon />, label: 'Inicio' },
  { href: '/(private)/loans', icon: <AccountBalanceIcon />, label: 'Préstamos' },
  { href: '/(private)/payments', icon: <PaymentsIcon />, label: 'Pagos' },
  { href: '/(admin)', icon: <SettingsIcon />, label: 'Admin' }
];

export default function Sidebar() {
  return (
    <Box component="nav" sx={{ height: '100%', borderRight: '1px solid', borderColor: 'divider' }}>
      <Toolbar />
      <List>
        {items.map((it) => (
          <ListItemButton key={it.href} component={Link} href={it.href}>
            <ListItemIcon>{it.icon}</ListItemIcon>
            <ListItemText primary={it.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
