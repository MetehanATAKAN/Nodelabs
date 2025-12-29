import { readStoredAuth } from '../model/storage'

export function useAccessToken(): string | null {
  const storedAuth = readStoredAuth()
  return storedAuth.tokens?.accessToken ?? null
}

