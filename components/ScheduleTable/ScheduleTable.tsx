import { JSX } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Supervisor } from 'engine/types';
import { stateColors } from 'styles/scheduleColors';

export interface ScheduleTableProps {
  supervisors: Supervisor[];
}

export function ScheduleTable({
  supervisors,
}: ScheduleTableProps): JSX.Element {
  const days = supervisors[0]?.timeline.length ?? 0;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Supervisor</TableCell>
            {Array.from({ length: days }).map((_, day) => (
              <TableCell key={day} align="center">
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {supervisors.map((supervisor) => (
            <TableRow key={supervisor.id}>
              <TableCell>{supervisor.id}</TableCell>

              {supervisor.timeline.map((state, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    backgroundColor: stateColors[state],
                    fontWeight: 'bold',
                  }}
                >
                  {state}
                </TableCell>
              ))}
            </TableRow>
          ))}

          <TableRow>
            <TableCell>#P</TableCell>
            {Array.from({ length: days }).map((_, day) => {
              const count = supervisors.filter(
                (s) => s.timeline[day] === 'P'
              ).length;

              return (
                <TableCell
                  key={day}
                  align="center"
                  sx={{
                    color: count !== 2 ? 'error.main' : 'inherit',
                    fontWeight: count !== 2 ? 'bold' : 'normal',
                  }}
                >
                  {count}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
