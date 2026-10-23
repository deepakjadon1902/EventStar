import type {
  Category,
  CreatorAccess,
  EventFormat,
  Region,
  TechEvent,
} from "../types/event";
type Seed = [
  slug: string,
  name: string,
  start: string,
  end: string,
  city: string,
  country: string,
  region: Region,
  format: EventFormat,
  url: string,
  categories: Category[],
  organizer: string,
  summary: string,
  extras?: Partial<TechEvent>,
];
export function createEvent([
  slug,
  name,
  startDate,
  endDate,
  city,
  country,
  region,
  format,
  officialUrl,
  categories,
  organizer,
  summary,
  extras,
]: Seed): TechEvent {
  const creatorAccess: CreatorAccess = [
    "Bloomberg",
    "The Wall Street Journal",
    "Y Combinator",
    "World Economic Forum",
  ].includes(organizer)
    ? "invitation"
    : "open";
  return {
    id: slug,
    slug,
    name,
    startDate,
    endDate,
    city,
    country,
    region,
    format,
    officialUrl: `https://${officialUrl}`,
    categories,
    organizer,
    summary,
    creatorAccess,
    status: "scheduled",
    lastVerified: "2026-10-23",
    ...extras,
  };
}
export type { Seed };
