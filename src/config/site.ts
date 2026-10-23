const brandName = "NorthStar Tech Events";
export const site = {
  name: brandName,
  shortName: brandName.replace(/ Tech Events$/, ""),
  tagline: "A clearer view of what’s next.",
  foundedYear: 2000,
  email: "hello@your-domain.com",
  legalCompanyName: "{{LEGAL_COMPANY_NAME}}",
  governingLaw: "{{GOVERNING_LAW_AND_VENUE}}",
  retention: "{{APPLICATION_RETENTION_PERIOD}}",
  url:
    import.meta.env.VITE_SITE_URL ||
    "https://northstar-tech-events.nuttyrain25.chatgpt.site",
  legalUpdated: "2026-10-23",
  socialLinks: [],
} as const;
