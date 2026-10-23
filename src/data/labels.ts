import type { Category, EventFormat, Region } from "../types/event";
export const regionLabels: Record<Region, string> = {
  usa: "USA",
  "uk-europe": "UK & Europe",
  "china-hk": "China & Hong Kong",
  "asia-pacific": "Asia-Pacific",
  "middle-east-africa": "Middle East & Africa",
  "americas-other": "Rest of the Americas",
  online: "Online",
};
export const categoryLabels: Record<Category, string> = {
  ai: "AI",
  cloud: "Cloud",
  developer: "Developer",
  enterprise: "Enterprise",
  startup: "Startups",
  fintech: "Fintech",
  crypto: "Crypto",
  gaming: "Gaming",
  hardware: "Hardware",
  consumer: "Consumer",
  security: "Security",
  data: "Data",
  "open-source": "Open source",
  general: "Technology",
};
export const formatLabels: Record<EventFormat, string> = {
  "in-person": "In person",
  hybrid: "Hybrid",
  virtual: "Virtual",
};
