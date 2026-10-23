import { upcomingSeeds } from "./events.upcoming";
import { pastSeeds } from "./events.past";
export const events = [...upcomingSeeds, ...pastSeeds].sort(
  (a, b) =>
    a.startDate.localeCompare(b.startDate) || a.name.localeCompare(b.name),
);
export const lastVerified = "2026-10-23";
