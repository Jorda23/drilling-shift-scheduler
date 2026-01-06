'use client';
import { Container, Stack, Typography, Divider } from '@mui/material';

import { ConfigForm, ScheduleTable } from 'components';
import { ScheduleStatus } from 'components/ScheduleStatus';
import { ScheduleSummary } from 'components/ScheduleSummary';
import { generateSchedule } from 'engine/scheduler';
import { Supervisor } from 'engine/types';
import { JSX, useState } from 'react';


export default function Home(): JSX.Element {
  const [schedule, setSchedule] = useState<Supervisor[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleCalculate = (): void => {
    try {
      const result = generateSchedule({
        workDays: 14,
        restDays: 7,
        inductionDays: 5,
        totalDays: 30,
      });

      setSchedule(result);
      setErrors([]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        setErrors(['Unexpected error while generating schedule']);
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="h4" fontWeight={700}>
            Visualización de Cronograma
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestión de turnos de supervisores y validación de cobertura diaria.
          </Typography>
        </Stack>

        <Divider />

        <ConfigForm onCalculate={handleCalculate} />

        {schedule.length > 0 && (
          <>
            <ScheduleSummary supervisors={schedule} />
            <ScheduleTable supervisors={schedule} />
            <ScheduleStatus supervisors={schedule} />
          </>
        )}
      </Stack>
    </Container>
  );
}
