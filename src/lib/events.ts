import { format, parseISO } from "date-fns";
import { events } from "../data";
import type { TechEvent } from "../types/event";
export function localDate(date = new Date()) {
  return format(date, "yyyy-MM-dd");
}
export function isUpcoming(event: TechEvent, today = localDate()) {
  return event.endDate >= today;
}
export function isPast(event: TechEvent, today = localDate()) {
  return event.endDate < today;
}
export function isHappening(event: TechEvent, today = localDate()) {
  return (
    event.status !== "cancelled" &&
    event.startDate <= today &&
    event.endDate >= today
  );
}
export function getUpcoming(today = localDate()) {
  return events
    .filter((e) => isUpcoming(e, today))
    .sort(
      (a, b) =>
        a.startDate.localeCompare(b.startDate) || a.name.localeCompare(b.name),
    );
}
export function getPast(today = localDate()) {
  return events
    .filter((e) => isPast(e, today))
    .sort(
      (a, b) =>
        b.endDate.localeCompare(a.endDate) ||
        b.startDate.localeCompare(a.startDate),
    );
}
export function groupByMonth(items: TechEvent[]) {
  return items.reduce<Record<string, TechEvent[]>>((groups, e) => {
    const month = e.startDate.slice(0, 7);
    (groups[month] ??= []).push(e);
    return groups;
  }, {});
}
export function formatDateRange(start: string, end: string) {
  const a = parseISO(start),
    b = parseISO(end);
  if (start === end) return format(a, "MMM d, yyyy");
  if (start.slice(0, 7) === end.slice(0, 7))
    return `${format(a, "MMM d")}–${format(b, "d, yyyy")}`;
  if (start.slice(0, 4) === end.slice(0, 4))
    return `${format(a, "MMM d")} – ${format(b, "MMM d, yyyy")}`;
  return `${format(a, "MMM d, yyyy")} – ${format(b, "MMM d, yyyy")}`;
}
export function getRelated(event: TechEvent) {
  return events
    .filter(
      (e) =>
        e.id !== event.id &&
        (e.region === event.region ||
          e.categories.some((c) => event.categories.includes(c))),
    )
    .sort(
      (a, b) =>
        Number(isUpcoming(b)) - Number(isUpcoming(a)) ||
        a.startDate.localeCompare(b.startDate),
    )
    .slice(0, 3);
}
export interface EventFilters {
  view: string;
  q: string;
  region: string;
  category: string;
  format: string;
  creators: boolean;
}
export function filterEvents(items: TechEvent[], filters: EventFilters) {
  const q = filters.q.trim().toLowerCase();
  return items.filter(
    (e) =>
      (!q ||
        `${e.name} ${e.city} ${e.country} ${e.organizer ?? ""}`
          .toLowerCase()
          .includes(q)) &&
      (!filters.region || e.region === filters.region) &&
      (!filters.category || e.categories.some((c) => c === filters.category)) &&
      (!filters.format || e.format === filters.format) &&
      (!filters.creators ||
        (e.creatorAccess === "open" && e.status !== "cancelled")),
  );
}
