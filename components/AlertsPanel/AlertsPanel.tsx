import { JSX } from 'react';
import { Alert, Stack } from '@mui/material';

export interface AlertsPanelProps {
  errors: string[];
}

export function AlertsPanel({ errors }: AlertsPanelProps): JSX.Element | null {
  if (errors.length === 0) return null;

  return (
    <Stack spacing={1} sx={{ mt: 2 }}>
      {errors.map((error, index) => (
        <Alert severity="error" key={index}>
          {error}
        </Alert>
      ))}
    </Stack>
  );
}
