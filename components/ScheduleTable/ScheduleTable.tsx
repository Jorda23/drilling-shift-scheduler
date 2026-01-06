import { JSX } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
} from "@mui/material";
import { Supervisor } from "engine/types";
import { stateColors } from "styles/scheduleColors";

export interface ScheduleTableProps {
  supervisors: Supervisor[];
}

export function ScheduleTable({
  supervisors,
}: ScheduleTableProps): JSX.Element {
  const theme = useTheme();
  const days = supervisors[0]?.timeline.length ?? 0;

  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: "auto",
        borderRadius: 2,
        padding: 1,
        backdropFilter: "blur(8px)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 2px 8px rgba(0,0,0,0.6)"
            : "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Supervisor</TableCell>

            {Array.from({ length: days }).map((_, day) => (
              <TableCell key={day} align="center" sx={{ fontWeight: 600 }}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {supervisors.map((supervisor) => (
            <TableRow key={supervisor.id}>
              <TableCell sx={{ fontWeight: 600 }}>{supervisor.id}</TableCell>

              {supervisor.timeline.map((state, index) => (
                <TableCell key={index} align="center">
                  {state !== "-" ? (
                    <Chip
                      label={state}
                      size="small"
                      sx={{
                        backgroundColor: stateColors[state],
                        color: "#fff",
                        fontWeight: 700,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}

          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>#P</TableCell>

            {Array.from({ length: days }).map((_, day) => {
              const count = supervisors.filter(
                (s) => s.timeline[day] === "P"
              ).length;

              return (
                <TableCell key={day} align="center">
                  <Chip
                    label={count}
                    size="small"
                    color={count === 2 ? "success" : "error"}
                    variant={count === 2 ? "filled" : "outlined"}
                  />
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
