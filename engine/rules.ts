import { Supervisor } from "./types";

export function validateDay(
  supervisors: Supervisor[],
  day: number
) {
  const drilling = supervisors.filter(
    (s) => s.timeline[day] === 'P'
  );

  if (drilling.length > 2) {
    throw new Error(`Day ${day}: 3 supervisors drilling`);
  }

  const s3Active = supervisors.find(
    (s) => s.id === 'S3'
  )?.active;

  if (drilling.length < 2 && s3Active) {
    throw new Error(`Day ${day}: only 1 supervisor drilling`);
  }
}
