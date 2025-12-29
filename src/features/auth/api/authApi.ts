import { getJson, postJson } from '@/shared/api/http'
import type { AuthUser, AuthTokens } from '../model/types'

type SignInRequest = {
  email: string
  password: string
}

type SignUpRequest = {
  fullName: string
  email: string
  password: string
}

type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

type LoginResponseData = {
  user: AuthUser
  accessToken: string
}

type SignUpResponseData = {
  id: string
  fullName: string
  email: string
}

type SignInResponse = {
  user: AuthUser
  tokens: AuthTokens
}

export const authApi = {
  async signIn(credentials: SignInRequest): Promise<SignInResponse> {
    const response = await postJson<ApiResponse<LoginResponseData>>('/users/login', credentials)
    
    return {
      user: response.data.user,
      tokens: {
        accessToken: response.data.accessToken,
        refreshToken: '',
      },
    }
  },

  async signUp(data: SignUpRequest): Promise<SignInResponse> {
    const response = await postJson<ApiResponse<SignUpResponseData>>('/users/register', data)

    return {
      user: {
        id: response.data.id,
        fullName: response.data.fullName,
        email: response.data.email,
        role: 'user',
        isActive: true,
        lastLoginAt: '',
        lastLoginIP: '',
        createdAt: '',
        updatedAt: '',
      },
      tokens: {
        accessToken: '',
        refreshToken: '',
      },
    }
  },

  async signOut(accessToken: string): Promise<void> {
    await postJson<ApiResponse<null>>('/users/logout', {}, accessToken)
  },

  async getProfile(accessToken: string): Promise<AuthUser> {
    const res = await getJson<ApiResponse<{
      id: string
      fullName: string
      email: string
      role: string
      isActive: boolean
      lastLoginAt: string
      lastLoginIP: string
      createdAt: string
      updatedAt: string
    }>>('/users/profile', accessToken)

    return res.data
  },

  async refreshToken(): Promise<string> {
    const response = await postJson<{ accessToken: string }>('/users/refresh-token', {})
    return response.accessToken
  },
}

