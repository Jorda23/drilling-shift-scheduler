'use client';

import { AlertsPanel, ConfigForm, ScheduleTable } from 'components';
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
    <>
      <ConfigForm onCalculate={handleCalculate} />
      <AlertsPanel errors={errors} />
      {schedule.length > 0 && (
        <ScheduleTable supervisors={schedule} />
      )}
    </>
  );
}
