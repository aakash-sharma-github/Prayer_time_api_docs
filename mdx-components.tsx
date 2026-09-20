import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'

import { GitHubStats } from '@/components/GitHubStats'

export function useMDXComponents(components: Record<string, unknown>) {
  return {
    ...getDocsMDXComponents(),
    GitHubStats,
    ...components
  }
}
