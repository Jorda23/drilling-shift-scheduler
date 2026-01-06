"use client";

import { JSX, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import { ConfigForm, ScheduleTable } from "components";
import { Navbar } from "components/Navbar";
import { ScheduleStatus } from "components/ScheduleStatus";
import { ScheduleSummary } from "components/ScheduleSummary";
import { generateSchedule } from "engine/scheduler";
import { Supervisor } from "engine/types";

type ErrorState = {
  message: string;
  open: boolean;
};

export default function Home(): JSX.Element {
  const [schedule, setSchedule] = useState<Supervisor[]>([]);
  const [errorState, setErrorState] = useState<ErrorState>({
    message: "",
    open: false,
  });

  const showError = (message: string) => {
    setErrorState({
      message,
      open: true,
    });
  };

  const closeError = () => {
    setErrorState((prev) => ({ ...prev, open: false }));
  };

  const handleCalculate = (config: {
    workDays: number;
    restDays: number;
    inductionDays: number;
    totalDays: number;
  }) => {
    try {
      const result = generateSchedule(config);
      setSchedule(result);
      closeError();
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "Unexpected error while generating schedule"
      );
    }
  };

  return (
    <>
      <Navbar schedule={schedule} />

      <Snackbar
        open={errorState.open}
        autoHideDuration={4000}
        onClose={closeError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={closeError}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorState.message}
        </Alert>
      </Snackbar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Stack spacing={0.5}>
            <Typography variant="h4" fontWeight={700}>
              Visualización de Cronograma
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gestión de turnos de supervisores y validación de cobertura
              diaria.
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
    </>
  );
}
