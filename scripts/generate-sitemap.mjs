import { readFileSync, writeFileSync } from "node:fs";
const config = readFileSync("src/config/site.ts", "utf8");
const origin =
  process.env.VITE_SITE_URL ||
  config.match(/\|\|\s*["'](https:\/\/[^"']+)["']/)?.[1];
if (!origin) throw new Error("Site origin is missing.");
const pages = [
  "/",
  "/events",
  "/creators",
  "/about",
  "/contact",
  "/legal/terms",
  "/legal/privacy",
  "/legal/disclaimer",
  "/legal/creator-terms",
  "/legal/accessibility",
  "/legal/conduct",
  "/legal/cookies",
];
for (const file of ["src/data/events.upcoming.ts", "src/data/events.past.ts"]) {
  const data = readFileSync(file, "utf8");
  for (const match of data.matchAll(
    /\[\s*["']([a-z0-9-]+)["']\s*,\s*["'][^"']+["']\s*,\s*["']\d{4}-\d{2}-\d{2}["']/g,
  ))
    pages.push(`/events/${match[1]}`);
}
const urls = [...new Set(pages)];
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `\n  <url><loc>${origin}${path}</loc></url>`).join("")}\n</urlset>\n`,
);
writeFileSync(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /creators/apply\nSitemap: ${origin}/sitemap.xml\n`,
);
console.info(`Generated sitemap with ${urls.length} URLs.`);
