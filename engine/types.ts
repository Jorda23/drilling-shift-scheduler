export type State = 'S' | 'I' | 'P' | 'B' | 'D' | '-';

export interface Supervisor {
  id: 'S1' | 'S2' | 'S3';
  timeline: State[];
  cycleDay: number;
  active: boolean;
}
