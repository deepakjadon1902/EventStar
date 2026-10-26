# NorthStar Tech Events

A React 18 + Vite + strict TypeScript frontend built from the supplied specification. Source is under `src/`, with all 53 supplied event records, query-synced filters, lazy-loaded pages, a creator program and application, contact form, calendar downloads, and legal templates.

## Run

```sh
npm install
npm run dev
```

## Verify and build

```sh
npm run typecheck
npm test
npm run lint
npm run format:check
npm run build
```

`dist/` is a static SPA. Hosting must route unknown paths to `index.html`. Vite dev and preview servers handle this. The Sites static deployment preserves SPA fallback by omitting a `404.html` file.

## Configuration

- Change the brand, contact email, legal company name, governing law, and retention in `src/config/site.ts`.
- Copy `.env.example` to `.env` and optionally set `VITE_FORM_ENDPOINT` to an HTTPS endpoint accepting JSON. Creator and contact submissions share the adapter in `src/lib/submit.ts` and include a `kind` discriminator. The endpoint must allow the deployed origin through CORS.
- Without the endpoint, forms visibly run in demo mode. No submissions are sent or persisted. Only development builds log demo payloads; production builds do not log personal data.
- `VITE_SITE_URL` sets the canonical origin; pass it as a build environment variable for the sitemap when using another domain.
- There are no cookies, analytics, ticket sales, payments, accounts, or backend.

## Content and sources

The supplied 23 October 2026 catalog is stored in `src/data/events.upcoming.ts` and `src/data/events.past.ts`. The upcoming/past split is always computed from the visitor’s local date using the event end date. Ending today remains upcoming. Cancelled listings stay in the directory and are clearly marked; application choices exclude them. “Open to creators” means this site accepts coverage applications, never that an organizer guarantees credentials.

Sources reviewed: https://www.techmeme.com/events, https://websummit.com/web-summit-2026/, and https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/. Individual records link to organizer websites. Supplied verification dates are surfaced in the UI. Organizer facts should be checked again before a public launch; the initial preview does not claim every organizer page was independently revalidated.

Legal pages are drafting templates. The legal entity, governing law, retention, processor details, and placeholder contact address require completion and qualified legal review before a public launch. The creator terms and disclaimer retain the supplied clauses. No founders, customers, endorsements, attendee statistics, or awards have been invented.

## Accessibility and performance

The interface uses native selects and checkboxes, a modal mobile navigation dialog, keyboard-operable tabs and accordions, visible focus, a skip link, reduced-motion support, self-hosted Latin fonts, route-level code splitting, and text labels for status badges. A full browser, screen-reader, and Lighthouse audit is still needed to certify the requested conformance and performance targets.

## Dependency constraints

The requested Router v6 and Tailwind v3 are retained. Router v6 currently has upstream moderate advisories whose published fixes require v7; this app uses fixed internal navigation targets, URL-encoded search values, and no SSR hydration. Tailwind v3 also retains build-tool dependency advisories. Build inputs are local source files. Do not feed untrusted navigation destinations or build patterns into these APIs. Review dependency updates before a public launch.
# EventStar
