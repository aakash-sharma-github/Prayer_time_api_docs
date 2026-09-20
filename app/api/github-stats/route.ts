import { NextResponse } from 'next/server'

const repository = 'aakash-sharma-github/Prayer_time_api'
const githubApiBaseUrl = `https://api.github.com/repos/${repository}`

export const revalidate = 3600

function commitCountFromLinkHeader(linkHeader: string | null): number {
  if (!linkHeader) {
    return 1
  }

  const lastPage = linkHeader.match(/[?&]page=(\d+)>; rel="last"/)
  return lastPage?.[1] ? Number(lastPage[1]) : 1
}

export async function GET() {
  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
    const [repositoryResponse, commitsResponse] = await Promise.all([
      fetch(githubApiBaseUrl, { headers, next: { revalidate } }),
      fetch(`${githubApiBaseUrl}/commits?per_page=1`, { headers, next: { revalidate } })
    ])

    if (!repositoryResponse.ok || !commitsResponse.ok) {
      throw new Error('GitHub statistics request failed')
    }

    const repositoryData: unknown = await repositoryResponse.json()
    if (
      typeof repositoryData !== 'object' ||
      repositoryData === null ||
      !('stargazers_count' in repositoryData) ||
      typeof repositoryData.stargazers_count !== 'number'
    ) {
      throw new Error('GitHub repository response was invalid')
    }

    return NextResponse.json(
      {
        stars: repositoryData.stargazers_count,
        commits: commitCountFromLinkHeader(commitsResponse.headers.get('link'))
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      }
    )
  } catch {
    return NextResponse.json(
      { error: 'GitHub statistics are temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'public, max-age=300' } }
    )
  }
}
