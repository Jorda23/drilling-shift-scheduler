import { Alert } from '@mui/material';
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
      <Alert severity="success">
        El cronograma es válido. Todos los días tienen exactamente 2
        supervisores perforando.
      </Alert>
    );
  }

  return (
    <Alert severity="warning">
      Estado del cronograma: Requiere revisión. Se detectaron{' '}
      <strong>{invalidDays}</strong> días con cobertura incorrecta.
    </Alert>
  );
}
