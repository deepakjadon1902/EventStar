export type Region =
  | "usa"
  | "uk-europe"
  | "china-hk"
  | "asia-pacific"
  | "middle-east-africa"
  | "americas-other"
  | "online";
export type Category =
  | "ai"
  | "cloud"
  | "developer"
  | "enterprise"
  | "startup"
  | "fintech"
  | "crypto"
  | "gaming"
  | "hardware"
  | "consumer"
  | "security"
  | "data"
  | "open-source"
  | "general";
export type EventFormat = "in-person" | "hybrid" | "virtual";
export type EventStatus = "scheduled" | "cancelled" | "rescheduled";
export type CreatorAccess = "open" | "invitation" | "closed";
export interface TechEvent {
  id: string;
  slug: string;
  name: string;
  organizer?: string;
  startDate: string;
  endDate: string;
  venue?: string;
  city: string;
  country: string;
  region: Region;
  format: EventFormat;
  status: EventStatus;
  categories: Category[];
  summary: string;
  scheduleGlance?: { day: string; label: string }[];
  officialUrl: string;
  creatorAccess: CreatorAccess;
  featured?: boolean;
  lastVerified: string;
  mediaUrl?: string;
  tracks?: string[];
  inPersonOnly?: boolean;
}
