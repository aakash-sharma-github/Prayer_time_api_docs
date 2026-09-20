'use client'

import { useEffect, useState } from 'react'

const repositoryUrl = 'https://github.com/aakash-sharma-github/Prayer_time_api'

type GitHubStats = {
  stars: number
  commits: number
}

function formatCount(value: number): string {
  return new Intl.NumberFormat('en').format(value)
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/github-stats', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('GitHub statistics request failed')
        }
        return (await response.json()) as GitHubStats
      })
      .then(setStats)
      .catch(() => {
        // The linked GitHub pages remain useful if the public API is unavailable.
      })

    return () => controller.abort()
  }, [])

  return (
    <p aria-live="polite">
      <a href={`${repositoryUrl}/stargazers`}>
        GitHub stars: <strong>{stats ? formatCount(stats.stars) : 'Loading…'}</strong>
      </a>
      {' · '}
      <a href={`${repositoryUrl}/commits/main`}>
        Commits: <strong>{stats ? formatCount(stats.commits) : 'Loading…'}</strong>
      </a>
    </p>
  )
}
