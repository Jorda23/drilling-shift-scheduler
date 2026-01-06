import { Supervisor, State } from "./types";

interface Config {
  workDays: number;
  restDays: number;
  inductionDays: number;
  totalDays: number;
}

export function generateSchedule(config: Config): Supervisor[] {
  validateConfig(config);

  const supervisors: Supervisor[] = [
    { id: "S1", timeline: [], cycleDay: 0, active: true },
    { id: "S2", timeline: [], cycleDay: 0, active: true },
    { id: "S3", timeline: [], cycleDay: 0, active: false },
  ];

  const s1DownDay = 1 + config.workDays;
  const s3EntryDay = s1DownDay - config.inductionDays - 1;

  for (let day = 0; day < config.totalDays; day++) {
    if (day === s3EntryDay) {
      supervisors[2].active = true;
      supervisors[2].cycleDay = 0;
    }

    supervisors.forEach((s) => {
      s.timeline[day] = nextState(s, config);
    });

    enforceExactlyTwoP(supervisors, day);

    supervisors.forEach((s) => s.cycleDay++);
  }

  return supervisors;
}

function nextState(s: Supervisor, cfg: Config): State {
  if (!s.active) return "-";

  if (s.cycleDay === 0) return "S";
  if (s.cycleDay <= cfg.inductionDays) return "I";

  if (s.cycleDay < cfg.workDays) return "P";
  if (s.cycleDay === cfg.workDays) {
    return s.id === "S1" ? "B" : "P";
  }

  if (s.cycleDay < cfg.workDays + cfg.restDays) {
    if (s.id === "S1") return "D";

    return "P";
  }

  s.cycleDay = -1;
  return "D";
}

function enforceExactlyTwoP(supervisors: Supervisor[], day: number) {
  const drilling = supervisors.filter((s) => s.timeline[day] === "P");

  while (drilling.length < 2) {
    const candidate = supervisors.find(
      (s) => s.id !== "S1" && s.active && s.timeline[day] !== "P"
    );

    if (!candidate) break;

    candidate.timeline[day] = "P";
    drilling.push(candidate);
  }

  while (drilling.length > 2) {
    const toStop = drilling.find((s) => s.id !== "S1");
    if (!toStop) break;

    toStop.timeline[day] = "B";
    drilling.splice(drilling.indexOf(toStop), 1);
  }
}

function validateConfig(cfg: Config): void {
  if (cfg.workDays <= 0) {
    throw new Error("Los días de trabajo (N) deben ser un número mayor a 0.");
  }

  if (cfg.restDays < 2) {
    throw new Error(
      "Los días de descanso (M) deben ser al menos 2 para garantizar rotación adecuada."
    );
  }

  if (cfg.inductionDays < 1 || cfg.inductionDays > 5) {
    throw new Error("Los días de inducción deben estar entre 1 y 5.");
  }

  if (cfg.inductionDays >= cfg.workDays) {
    throw new Error(
      "Los días de inducción deben ser menores que los días de trabajo (N)."
    );
  }

  if (cfg.totalDays < cfg.workDays) {
    throw new Error(
      "El total de días de perforación debe ser igual o mayor a los días de trabajo (N)."
    );
  }
}
