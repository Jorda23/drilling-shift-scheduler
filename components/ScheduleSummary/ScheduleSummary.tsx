import { Box, Card, Typography, Stack, useTheme } from "@mui/material";
import { Supervisor } from "engine/types";

const STATES = [
  { key: "P", label: "Perforando", color: "#4CAF50" },
  { key: "I", label: "Inducción", color: "#FFC107" },
  { key: "S", label: "Subida", color: "#2196F3" },
  { key: "B", label: "Bajada", color: "#F44336" },
  { key: "D", label: "Descanso", color: "#9E9E9E" },
];

export function ScheduleSummary({
  supervisors,
}: {
  supervisors: Supervisor[];
}) {
  const theme = useTheme();

  const allStates = supervisors.flatMap((s) => s.timeline);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 2,
      }}
    >
      {STATES.map((state) => {
        const count = allStates.filter((s) => s === state.key).length;

        return (
          <Card
            key={state.key}
            sx={{
              p: 2,
              backdropFilter: "blur(8px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 2px 8px rgba(0,0,0,0.6)"
                  : "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Stack spacing={0.5}>
              <Typography
                variant="subtitle2"
                sx={{ color: state.color, fontWeight: 600 }}
              >
                {state.label}
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {count}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Turnos
              </Typography>
            </Stack>
          </Card>
        );
      })}
    </Box>
  );
}
