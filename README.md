# azanAPI Documentation

This is the documentation website for [azanAPI](../README.md), a versioned REST API for calculating Islamic prayer times and final Azan times. The site is built with Next.js, Nextra, MDX, and TypeScript.

It contains practical guides, endpoint reference material, examples, Home Assistant instructions, and deployment guidance. The FastAPI application itself lives in the parent project; this directory contains no prayer-time calculation logic.

## Production API

The canonical public API base URL documented by this site is:

```text
https://api.aakashsharma.com.np
```

Public prayer endpoints use the `/api/v1` prefix. The Cloudflare Worker deployment
URL is infrastructure only and is not the recommended client endpoint.

## Contents

- Getting started and explanation of API responses
- Reference for health, single-day, and range prayer-time endpoints
- Calculation-method, Madhab, timezone, high-latitude, and Azan-adjustment concepts
- cURL, Python, and JavaScript examples
- Home Assistant sensors, automations, and troubleshooting
- Deployment guidance for Render, VPS, and HTTPS setups

## Prerequisites

- Node.js 20 or later
- npm 10 or later
- A running azanAPI instance when synchronizing the OpenAPI contract

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` when you need local overrides.

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public canonical URL used for metadata, sitemap, and robots output. | `https://docs.example.com` in the example file |
| `OPENAPI_URL` | FastAPI OpenAPI document used by the synchronization script. | `http://127.0.0.1:8000/openapi.json` for a local API; production is `https://api.aakashsharma.com.np/openapi.json` |

`NEXT_PUBLIC_SITE_URL` is exposed to the browser. Do not place secrets in variables prefixed with `NEXT_PUBLIC_`.

## OpenAPI synchronization

The FastAPI application owns the API contract. Start it locally from the parent directory, then synchronize the schema used by the docs:

```bash
uvicorn app.main:app --reload
```

In another terminal, from this directory:

```bash
npm run sync:openapi
```

To use a deployed API, set `OPENAPI_URL` to its `/openapi.json` URL before running the command. Review the resulting changes whenever the API contract changes.

## Production build

Build and serve the optimized site locally:

```bash
npm run build
npm run start
```

The project also runs `patch-package` after dependency installation to apply the included compatibility patch for Nextra.

## Project structure

```text
app/                 Next.js app-router entry points, metadata, sitemap, and robots
content/             MDX documentation organized by topic
lib/                 Shared OpenAPI utilities
scripts/             OpenAPI synchronization script
public/              Static assets
patches/             Dependency patches applied by patch-package
```

## Writing documentation

Content is authored in MDX under `content/`. Keep guides focused on user outcomes, use code examples that match the current API contract, and update navigation metadata when adding a section. API semantics, parameter validation, and response schemas must match the FastAPI OpenAPI document.

## Contributing

Contributions are welcome, especially corrections, clearer examples, accessibility improvements, and documentation for supported azanAPI behavior.

1. Discuss substantial additions in an issue first.
2. Keep changes focused and use clear, inclusive language.
3. Update affected examples and links.
4. Verify the production build with `npm run build` before opening a pull request.

Changes that alter API behavior belong in the FastAPI project and should include the corresponding contract, test, and documentation updates.

## License

This documentation project is released under the [MIT License](LICENSE).
