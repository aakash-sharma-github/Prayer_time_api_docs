# azanAPI Documentation — Agent Guide

## Purpose and scope

This repository is the public documentation website for azanAPI. It uses Next.js 16,
Nextra 4, MDX, React, and TypeScript. It documents the FastAPI service but does not
contain, duplicate, or change prayer-time calculation logic.

The API source of truth is the sibling `Prayer_time_api` repository (the parent
project in this workspace). Its generated `/openapi.json` defines endpoint shapes;
the MDX guides explain those shapes and usage.

The separate `azanAPI-homeassistant` repository packages the API for Home Assistant
OS. Keep deployment instructions consistent across repositories, but do not add Home
Assistant app packaging files here.

## Layout

```text
app/                 App Router layout, catch-all MDX route, sitemap, robots, 404
content/             MDX pages and per-section _meta.js navigation
  getting-started/   First request and response explanations
  api-reference/     Health, one-day, and range endpoint documentation
  concepts/          Methods, Madhab, timezones, high-latitude rules, adjustments
  examples/          cURL, Python, and JavaScript clients
  home-assistant/    Sensors, automations, troubleshooting
  deployment/        Render, VPS, and HTTPS guidance
lib/openapi.ts       Shared OpenAPI source metadata
scripts/sync-openapi.mjs
public/openapi.json  Downloaded API schema after synchronization
```

## API facts that documentation must preserve

- All public prayer routes use `/api/v1`.
- `GET /api/v1/prayer-times` calculates one local date.
- `GET /api/v1/prayer-times/range` returns an inclusive, chronological range with a
  366-date maximum.
- Requests require explicit latitude, longitude, IANA timezone, and calculation
  method. Never claim the API guesses timezone from coordinates.
- Calculated times are immutable. Minute adjustments apply only to Azan times for
  Fajr, Dhuhr, Asr, Maghrib, and Isha—not sunrise or sunset.
- Times are local `HH:MM` values. Adjustments may roll over midnight without a date
  in the returned time string.
- Invalid request parameters return `422` with `VALIDATION_ERROR`; unknown IANA
  zones return `400` with `INVALID_TIMEZONE`.

When in doubt, run the API and inspect `/openapi.json` instead of copying stale prose
or inventing an endpoint, option, response field, or deployment capability.

## Development workflow

Use Node.js 20+ and npm 10+.

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:3000`. Environment variables are documented
in `.env.example`:

- `NEXT_PUBLIC_SITE_URL`: canonical public documentation URL. Never place secrets in
  `NEXT_PUBLIC_*` variables because they are exposed to browsers.
- `OPENAPI_URL`: source API schema; it defaults to `http://127.0.0.1:8000/openapi.json`.

To synchronize the schema, start the API first, then from this repository run:

```bash
npm run sync:openapi
npm run build
```

`sync:openapi` writes `public/openapi.json`; review and commit it whenever a relevant
API contract update is intentionally documented. `postinstall` runs `patch-package`,
which applies the committed Nextra compatibility patch—do not remove the patch or its
package script without first verifying the production build.

## Content rules

- Put user-facing pages in the appropriate `content/` section as `.mdx`.
- Update the sibling `_meta.js` when adding, renaming, or reordering pages.
- Use concise, copy/paste-ready code examples and realistic placeholder values such
  as `<PI-IP>`; do not present example prayer times as universal facts.
- Keep cURL, JavaScript, Python, Home Assistant, and deployment examples aligned with
  the published API contract.
- Prefer links to the source API README/OpenAPI schema rather than duplicating large
  contract tables in multiple pages.
- Preserve accessibility: meaningful headings, descriptive links, readable tables,
  and no information conveyed only by color or images.

## Verification and change checklist

Before completing documentation changes:

```bash
npm run build
```

For API changes: update affected MDX pages, run the OpenAPI sync against the changed
API, review the schema diff, and build the site. For navigation or metadata changes,
check the affected route manually with `npm run dev` as well.

Do not modify the FastAPI implementation from this repository. Propose API behavior
changes in the API repository first, with tests and versioning review.
