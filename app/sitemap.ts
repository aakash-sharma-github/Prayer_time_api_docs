import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.example.com'
const routes = [
  '',
  '/getting-started',
  '/concepts',
  '/api-reference',
  '/examples',
  '/home-assistant',
  '/deployment'
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }))
}
