import { describe, it, expect } from "vitest";
import { events } from "../data";
import {
  filterEvents,
  formatDateRange,
  getUpcoming,
  getPast,
  groupByMonth,
  isHappening,
  isUpcoming,
  isPast,
  localDate,
} from "./events";
const github = events.find((e) => e.slug === "github-universe-2026")!;
describe("calendar dates and catalog", () => {
  it("includes every supplied event once with valid dates and official HTTPS links", () => {
    expect(events).toHaveLength(53);
    expect(new Set(events.map((e) => e.id)).size).toBe(events.length);
    for (const event of events) {
      expect(event.endDate >= event.startDate).toBe(true);
      expect(Number.isNaN(new Date(event.startDate).getTime())).toBe(false);
      expect(new URL(event.officialUrl).protocol).toBe("https:");
      expect(event.summary.length).toBeGreaterThan(50);
    }
  });
  it("uses local calendar dates, including dates close to UTC midnight", () => {
    const local = new Date(2026, 9, 23, 0, 5);
    expect(localDate(local)).toBe("2026-10-23");
  });
  it("keeps an event ending today upcoming, then moves it to the archive", () => {
    expect(isUpcoming(github, "2026-10-29")).toBe(true);
    expect(isPast(github, "2026-10-29")).toBe(false);
    expect(isUpcoming(github, "2026-10-30")).toBe(false);
    expect(isPast(github, "2026-10-30")).toBe(true);
  });
  it("never calls a cancelled event happening now", () => {
    expect(isHappening({ ...github, status: "cancelled" }, "2026-10-28")).toBe(
      false,
    );
    expect(isHappening(github, "2026-10-28")).toBe(true);
  });
  it("sorts upcoming ascending and archive by most recent end date", () => {
    const up = getUpcoming("2026-10-23"),
      past = getPast("2026-10-23");
    expect(up[0].slug).toBe("agntcon-mcpcon-north-america-2026");
    expect(past[0].slug).toBe("nvidia-gtc-berlin-2026");
    expect(
      up.every((e, i) => i === 0 || e.startDate >= up[i - 1].startDate),
    ).toBe(true);
    expect(
      past.every((e, i) => i === 0 || e.endDate <= past[i - 1].endDate),
    ).toBe(true);
  });
  it("formats single-day, same-month, cross-month and cross-year dates", () => {
    expect(formatDateRange("2026-11-12", "2026-11-12")).toBe("Nov 12, 2026");
    expect(formatDateRange("2026-11-09", "2026-11-12")).toBe("Nov 9–12, 2026");
    expect(formatDateRange("2026-11-30", "2026-12-04")).toBe(
      "Nov 30 – Dec 4, 2026",
    );
    expect(formatDateRange("2026-12-31", "2027-01-02")).toBe(
      "Dec 31, 2026 – Jan 2, 2027",
    );
  });
  it("groups every event exactly once by start month", () => {
    const groups = groupByMonth(events);
    expect(Object.values(groups).flat()).toHaveLength(events.length);
    expect(
      groups["2026-11"].every((e) => e.startDate.startsWith("2026-11")),
    ).toBe(true);
  });
  it("combines search, region, category, format and creator filters", () => {
    const filters = {
      view: "upcoming",
      q: "GitHub",
      region: "usa",
      category: "developer",
      format: "hybrid",
      creators: true,
    };
    expect(
      filterEvents(getUpcoming("2026-10-23"), filters).map((e) => e.id),
    ).toEqual([github.id]);
    expect(filterEvents(events, { ...filters, region: "china-hk" })).toEqual(
      [],
    );
    expect(
      filterEvents(events, {
        ...filters,
        q: "",
        category: "",
        format: "",
      }).some((e) => e.status === "cancelled"),
    ).toBe(false);
  });
});
