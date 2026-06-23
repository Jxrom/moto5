import { MaintenanceSchedule } from "../app/components/ScheduleMaintenanceModal";

export const DEFAULT_SCHEDULES: MaintenanceSchedule[] = [
  { type: "Engine oil change", intervalKm: 2000, lastDoneKm: 0, notes: "" },
  { type: "Gear oil replacement", intervalKm: 6000, lastDoneKm: 0, notes: "" },
  {
    type: "Clean or inspect air filter",
    intervalKm: 8000,
    lastDoneKm: 0,
    notes: "",
  },
  { type: "Replace spark plug", intervalKm: 12000, lastDoneKm: 0, notes: "" },
  { type: "Replace air filter", intervalKm: 12000, lastDoneKm: 0, notes: "" },
  {
    type: "Inspect CVT belt and rollers",
    intervalKm: 16000,
    lastDoneKm: 0,
    notes: "",
  },
  {
    type: "Replace V-belt if worn",
    intervalKm: 24000,
    lastDoneKm: 0,
    notes: "",
  },
];
