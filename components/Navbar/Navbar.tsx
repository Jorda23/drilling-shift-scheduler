'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorMode } from 'theme/ColorModeContext';

export function Navbar() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const isDark = theme.palette.mode === 'dark';

  return (
    <AppBar position="sticky" elevation={0} color="default">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Planificador de Perforación
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={toggleColorMode}
            aria-label="toggle dark mode"
          >
            {isDark ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
          >
            Exportar
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
