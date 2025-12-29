export type AuthUser = {
  id: string
  fullName: string
  email: string
  role: string
  isActive: boolean
  lastLoginAt: string
  lastLoginIP: string
  createdAt: string
  updatedAt: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type AuthState = {
  user: AuthUser | null
  tokens: AuthTokens | null
}

