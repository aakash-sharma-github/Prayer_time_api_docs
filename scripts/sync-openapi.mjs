import { mkdir, writeFile } from 'node:fs/promises'

const sourceUrl = process.env.OPENAPI_URL ?? 'http://127.0.0.1:8000/openapi.json'
const response = await fetch(sourceUrl)

if (!response.ok) {
  throw new Error(`Unable to download OpenAPI schema from ${sourceUrl}: ${response.status}`)
}

const schema = await response.json()
if (!schema.openapi || !schema.paths) {
  throw new Error('The downloaded document is not a valid OpenAPI schema.')
}

await mkdir('public', { recursive: true })
await writeFile('public/openapi.json', `${JSON.stringify(schema, null, 2)}\n`)
console.log(`OpenAPI schema saved from ${sourceUrl}`)
