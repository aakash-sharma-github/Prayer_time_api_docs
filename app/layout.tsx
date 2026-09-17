import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata: Metadata = {
  title: {
    default: 'azanAPI Documentation',
    template: '%s | azanAPI Documentation'
  },
  description: 'Documentation for the azanAPI Islamic prayer-times REST API.',
  icons: {
    icon: '/favicon.svg'
  },
  openGraph: {
    title: 'azanAPI Documentation',
    description: 'Documentation for the azanAPI Islamic prayer-times REST API.',
    type: 'website'
  }
}

const navbar = (
  <Navbar
    logo={<b>azanAPI</b>}
    projectLink="https://github.com/aakash-sharma-github/Prayer_time_api"
  />
)

const footer = <Footer>© {new Date().getFullYear()} azanAPI</Footer>

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: 150, saturation: 55 }} />
      <body>
        <Layout
          docsRepositoryBase="https://github.com/aakash-sharma-github/Prayer_time_api_docs/tree/main"
          footer={footer}
          navbar={navbar}
          pageMap={await getPageMap()}
          search={<Search placeholder="Search documentation" />}
          sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1 }}
          themeSwitch={{ dark: 'Dark', light: 'Light', system: 'System' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
