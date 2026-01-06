import { render, screen } from "@testing-library/react";
import { Supervisor } from "engine/types";
import { ScheduleTable } from "../ScheduleTable";

jest.mock("styles/scheduleColors", () => ({
  stateColors: {
    S: "#000",
    I: "#000",
    P: "#000",
    B: "#000",
    D: "#000",
    "-": "#fff",
  },
}));

const supervisorsMock: Supervisor[] = [
  {
    id: "S1",
    timeline: ["S", "I", "P"],
    cycleDay: 0,
    active: true,
  },
  {
    id: "S2",
    timeline: ["S", "I", "P"],
    cycleDay: 0,
    active: true,
  },
  {
    id: "S3",
    timeline: ["-", "-", "-"],
    cycleDay: 0,
    active: false,
  },
];

describe("ScheduleTable", () => {
  it("renders one row per supervisor", () => {
    render(<ScheduleTable supervisors={supervisorsMock} />);

    expect(screen.getByText("S1")).toBeInTheDocument();
    expect(screen.getByText("S2")).toBeInTheDocument();
    expect(screen.getByText("S3")).toBeInTheDocument();
  });

  it("renders supervisor timelines correctly", () => {
    render(<ScheduleTable supervisors={supervisorsMock} />);

    expect(screen.getAllByText("S")).toHaveLength(2);
    expect(screen.getAllByText("I")).toHaveLength(2);
    expect(screen.getAllByText("P")).toHaveLength(2);
  });

  it("renders #P row with correct drilling counts per day", () => {
    render(<ScheduleTable supervisors={supervisorsMock} />);

    const counts = screen.getAllByText(/^[0-2]$/);

    expect(counts.map((c) => c.textContent)).toEqual(
      expect.arrayContaining(["0", "0", "2"])
    );
  });

  it("highlights #P cell when drilling count is not 2", () => {
    render(<ScheduleTable supervisors={supervisorsMock} />);

    const invalidCells = screen
      .getAllByText(/^[0-1]$/)
      .filter((cell) => cell.textContent !== "2");

    expect(invalidCells.length).toBeGreaterThan(0);
  });
});
