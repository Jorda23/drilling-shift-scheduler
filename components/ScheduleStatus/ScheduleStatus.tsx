import { Alert, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Supervisor } from 'engine/types';

export function ScheduleStatus({
  supervisors,
}: {
  supervisors: Supervisor[];
}) {
  const days = supervisors[0]?.timeline.length ?? 0;

  const invalidDays = Array.from({ length: days }).filter((_, day) => {
    const count = supervisors.filter(
      (s) => s.timeline[day] === 'P'
    ).length;
    return count !== 2;
  }).length;

  if (invalidDays === 0) {
    return (
      <Alert
        severity="success"
        variant="outlined"
        icon={<CheckCircleIcon />}
      >
        <Stack spacing={0.5}>
          <Typography fontWeight={600}>
            Cronograma válido
          </Typography>
          <Typography variant="body2">
            La cobertura diaria es correcta: todos los días cuentan con
            exactamente <strong>2 supervisores perforando</strong>.
          </Typography>
        </Stack>
      </Alert>
    );
  }

  return (
    <Alert
      severity="warning"
      variant="outlined"
      icon={<WarningAmberIcon />}
    >
      <Stack spacing={0.5}>
        <Typography fontWeight={600}>
          Cronograma con observaciones
        </Typography>
        <Typography variant="body2">
          Se detectaron <strong>{invalidDays} días</strong> donde la
          cobertura de perforación no cumple el estándar requerido
          (2 supervisores).
        </Typography>
        <Typography variant="body2">
          Revisa el esquema de turnos antes de aprobar el plan.
        </Typography>
      </Stack>
    </Alert>
  );
}
