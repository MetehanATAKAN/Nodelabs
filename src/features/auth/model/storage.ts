import type { AuthUser, AuthTokens } from './types'

const AUTH_STORAGE_KEY = 'auth'

type StoredAuth = {
  user: AuthUser | null
  tokens: AuthTokens | null
}

export function readStoredAuth(): StoredAuth {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) {
      return { user: null, tokens: null }
    }
    return JSON.parse(stored) as StoredAuth
  } catch {
    return { user: null, tokens: null }
  }
}

export function writeStoredAuth(auth: StoredAuth): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

