import type { TechEvent } from "../types/event";
export interface EventPhoto {
  src: string;
  alt: string;
  credit: string;
  caption: string;
}
const photos: Record<string, EventPhoto> = {
  websummit: {
    src: "/images/web-summit.jpg",
    alt: "A packed Web Summit arena in Lisbon, lit in purple and blue",
    credit: "Web Summit / Sportsfile",
    caption: "Web Summit · Previous edition",
  },
  github: {
    src: "/images/github.jpg",
    alt: "The keynote stage at GitHub Universe 2025",
    credit: "Andrzej Mazur / End3r",
    caption: "GitHub Universe · 2025 edition",
  },
  oracle: {
    src: "/images/oracle-photo.webp",
    alt: "Attendees at Oracle AI World",
    credit: "Oracle",
    caption: "Oracle AI World · Previous edition",
  },
  kubecon: {
    src: "/images/kubecon.avif",
    alt: "The main keynote at KubeCon and CloudNativeCon",
    credit: "The Linux Foundation / CNCF",
    caption: "KubeCon + CloudNativeCon · Previous edition",
  },
  aws: {
    src: "/images/aws.png",
    alt: "The illuminated AWS venue branding at re:Invent",
    credit: "Amazon Web Services",
    caption: "AWS re:Invent · Previous edition",
  },
};
export const summitPhoto = photos.websummit;
export function getEventPhoto(event: TechEvent): EventPhoto {
  if (/web-summit-lisbon/.test(event.slug)) return photos.websummit;
  if (/github-universe/.test(event.slug)) return photos.github;
  if (/oracle/.test(event.slug)) return photos.oracle;
  if (/kubecon/.test(event.slug)) return photos.kubecon;
  if (/aws-reinvent/.test(event.slug)) return photos.aws;
  const destinations: Record<string, [string, string]> = {
    usa: ["san-francisco.jpg", "San Francisco"],
    "uk-europe": ["london.jpg", "London"],
    "china-hk": ["singapore.jpg", "Singapore"],
    "asia-pacific": ["singapore.jpg", "Singapore"],
    "middle-east-africa": ["dubai.jpg", "Dubai"],
  };
  const [file, city] = destinations[event.region] || destinations.usa;
  return {
    src: `/images/${file}`,
    alt: `${city} cityscape, illustrating this event's region`,
    credit: "Unsplash",
    caption: `${city} · Regional inspiration`,
  };
}
