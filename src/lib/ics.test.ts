import { describe, it, expect } from "vitest";
import { buildIcs } from "./ics";
import { events } from "../data";
const event = events.find((e) => e.slug === "aws-reinvent-2026")!;
describe("iCalendar export", () => {
  it("exports an all-day calendar with an exclusive end date", () => {
    const ics = buildIcs(event, new Date("2026-10-23T12:00:00Z"));
    expect(ics).toContain("DTSTART;VALUE=DATE:20261130\r\n");
    expect(ics).toContain("DTEND;VALUE=DATE:20261205\r\n");
    expect(ics).toContain("DTSTAMP:20261023T120000Z\r\n");
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
  });
  it("escapes special text, uses cancelled status, and folds long UTF-8 lines", () => {
    const ics = buildIcs({
      ...event,
      name: "Hello, world; more\\text",
      summary: "Málaga ".repeat(80),
      status: "cancelled",
    });
    expect(ics).toContain("SUMMARY:Hello\\, world\\; more\\\\text");
    expect(ics).toContain("STATUS:CANCELLED");
    for (const line of ics.split("\r\n"))
      expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
  });
});
