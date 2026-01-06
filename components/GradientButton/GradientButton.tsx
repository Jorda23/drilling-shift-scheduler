'use client';

import { Button, ButtonProps, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export interface GradientButtonProps extends ButtonProps {
  startIcon?: React.ReactNode;
}

export function GradientButton({
  children,
  startIcon,
  ...props
}: GradientButtonProps) {
  const theme = useTheme();

  return (
    <Button
      {...props}
      startIcon={startIcon ?? <DownloadIcon />}
      sx={{
        px: 2.5,
        py: 1,
        borderRadius: 2,
        fontWeight: 600,
        textTransform: 'none',
        color: '#fff',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #4f83ff, #2b59ff)'
            : 'linear-gradient(135deg, #1976d2, #42a5f5)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #5c8dff, #3b6bff)'
              : 'linear-gradient(135deg, #1565c0, #1e88e5)',
        },
        '&:disabled': {
          opacity: 0.6,
          boxShadow: 'none',
        },
        ...(props.sx || {}),
      }}
    >
      {children}
    </Button>
  );
}
