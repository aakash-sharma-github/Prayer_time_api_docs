# azanAPI documentation

The public documentation site for azanAPI, built with Next.js, Nextra, MDX, and
TypeScript. This repository documents the API; it does not contain the FastAPI
application or duplicate its calculation logic.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production verification

```bash
npm run build
npm run start
```

## OpenAPI contract

Run the API locally, then synchronize its source-of-truth OpenAPI schema:

```bash
npm run sync:openapi
```

Set `OPENAPI_URL` to a deployed API URL when available. The current documentation
pages establish the API-reference architecture; rendering full generated reference
content is intentionally deferred.

## Repository setup

Initialize this folder as the separate `Prayer_time_api_docs` repository, then add
your GitHub remote and push the initial foundation commit.
