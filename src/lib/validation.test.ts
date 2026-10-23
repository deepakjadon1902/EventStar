import { describe, it, expect } from "vitest";
import { applicationSchema, contactSchema } from "./validation";
const valid = {
  name: "Test Creator",
  email: "creator@example.com",
  country: "IN",
  creatorTypes: ["Writer"],
  portfolio: "https://example.com/work",
  additionalLinks: ["", "", ""],
  audienceSize: "",
  events: ["github-universe-2026"],
  why: "I report on developer tools and want to cover the practical impact of AI workflows for my readers.",
  disclose: true,
  consent: true,
  website: "",
};
describe("application validation", () => {
  it("accepts a valid creator with no audience-size requirement", () =>
    expect(applicationSchema.safeParse(valid).success).toBe(true));
  it.each([
    { portfolio: "http://example.com" },
    { creatorTypes: [] },
    { events: [] },
    { events: ["not-an-event"] },
    { events: ["grace-hopper-celebration-2026"] },
    { events: ["ces-2026"] },
    { why: "Too short" },
    { why: "x".repeat(801) },
    { consent: false },
    { disclose: false },
    { website: "spam" },
    {
      additionalLinks: [
        "https://a.com",
        "https://b.com",
        "https://c.com",
        "https://d.com",
      ],
    },
  ])("rejects invalid values %o", (invalid) =>
    expect(applicationSchema.safeParse({ ...valid, ...invalid }).success).toBe(
      false,
    ),
  );
  it("validates contact messages and rejects the honeypot", () => {
    const message = {
      name: "Test User",
      email: "user@example.com",
      topic: "event",
      message: "Please review this conference listing.",
      website: "",
    };
    expect(contactSchema.safeParse(message).success).toBe(true);
    expect(
      contactSchema.safeParse({ ...message, website: "spam" }).success,
    ).toBe(false);
  });
});
