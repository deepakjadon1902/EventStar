import { z } from "zod";
import { events } from "../data";
import { isUpcoming } from "./events";
export const creatorTypes = [
  "Writer",
  "Video",
  "Podcast",
  "Photo",
  "Newsletter",
  "Other",
] as const;
export const httpsUrl = z
  .string()
  .url("Enter a valid URL.")
  .refine((value) => value.startsWith("https://"), "Use an https:// URL.");
export const applicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters.")
    .max(80, "Use 80 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  country: z.string().min(1, "Choose your country."),
  creatorTypes: z
    .array(z.enum(creatorTypes))
    .min(1, "Choose at least one creator type."),
  portfolio: httpsUrl,
  additionalLinks: z.array(z.union([httpsUrl, z.literal("")])).max(3),
  audienceSize: z.string().max(40),
  events: z
    .array(z.string())
    .min(1, "Choose at least one event.")
    .refine(
      (slugs) =>
        slugs.every((slug) =>
          events.some(
            (e) =>
              e.slug === slug &&
              isUpcoming(e) &&
              e.status !== "cancelled" &&
              e.creatorAccess !== "closed",
          ),
        ),
      "Choose an available upcoming event.",
    ),
  why: z
    .string()
    .trim()
    .min(50, "Tell us a little more — at least 50 characters.")
    .max(800, "Use 800 characters or fewer."),
  disclose: z
    .boolean()
    .refine((v) => v, "Please confirm that you will disclose sponsorships."),
  consent: z
    .boolean()
    .refine((v) => v, "Please agree to the Creator Terms and Privacy Policy."),
  website: z.literal(""),
});
export type ApplicationValues = z.infer<typeof applicationSchema>;
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  topic: z.enum(["general", "event", "correction", "creators", "privacy"]),
  message: z
    .string()
    .trim()
    .min(20, "Please include at least 20 characters.")
    .max(2000, "Use 2,000 characters or fewer."),
  website: z.literal(""),
});
export type ContactValues = z.infer<typeof contactSchema>;
