import { addDays, format, parseISO } from "date-fns";
import type { TechEvent } from "../types/event";
import { site } from "../config/site";
function escapeIcs(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}
function fold(line: string) {
  let result = "";
  let bytes = 0;
  for (const char of line) {
    const length = new TextEncoder().encode(char).length;
    if (bytes + length > 75) {
      result += "\r\n ";
      bytes = 1;
    }
    result += char;
    bytes += length;
  }
  return result;
}
export function buildIcs(event: TechEvent, now = new Date()) {
  return (
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//${site.name}//Event Calendar//EN`,
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${event.id}@${new URL(site.url).hostname}`,
      `DTSTAMP:${now
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "")}`,
      `DTSTART;VALUE=DATE:${event.startDate.replace(/-/g, "")}`,
      `DTEND;VALUE=DATE:${format(addDays(parseISO(event.endDate), 1), "yyyyMMdd")}`,
      `SUMMARY:${escapeIcs(event.name)}`,
      `DESCRIPTION:${escapeIcs(`${event.summary}\nConfirm all details with the organizer: ${event.officialUrl}`)}`,
      `LOCATION:${escapeIcs([event.venue, event.city, event.country].filter(Boolean).join(", "))}`,
      `URL:${event.officialUrl}`,
      `STATUS:${event.status === "cancelled" ? "CANCELLED" : "CONFIRMED"}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .map(fold)
      .join("\r\n") + "\r\n"
  );
}
