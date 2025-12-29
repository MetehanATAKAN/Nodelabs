import { ApiError } from './ApiError'
import { API_BASE_URL } from '../config/env'
import { refreshAccessToken } from '@/features/auth/lib/tokenRefresh'
import { readStoredAuth } from '@/features/auth/model/storage'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = 'An error occurred'
    let errorData: unknown

    try {
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        errorData = await response.json()
        if (typeof errorData === 'object' && errorData !== null && 'message' in errorData) {
          errorMessage = String(errorData.message)
        }
      } else {
        errorMessage = await response.text()
      }
    } catch {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`
    }

    if (response.status === 401 || response.status === 403) {
      errorMessage = 'Authentication required. Please sign in.'
    }

    throw new ApiError(response.status, errorMessage, errorData)
  }

  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json()
  }

  return response.text() as Promise<T>
}

async function makeRequest<T>(
  endpoint: string,
  options: RequestInit,
  accessToken?: string,
  retryOn401 = true,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: headers as HeadersInit,
    credentials: 'include',
  })

  if (response.status === 401 && retryOn401 && !endpoint.includes('/refresh-token') && !endpoint.includes('/login')) {
    try {
      const newAccessToken = await refreshAccessToken()
      const retryHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
        Authorization: `Bearer ${newAccessToken}`,
      }
      const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: retryHeaders as HeadersInit,
        credentials: 'include',
      })
      return handleResponse<T>(retryResponse)
    } catch {
      throw new ApiError(401, 'Authentication required. Please sign in.', null)
    }
  }

  return handleResponse<T>(response)
}

export async function getJson<T>(endpoint: string, accessToken?: string): Promise<T> {
  const storedAuth = readStoredAuth()
  const token = accessToken || storedAuth.tokens?.accessToken

  return makeRequest<T>(endpoint, { method: 'GET' }, token)
}

export async function postJson<T>(
  endpoint: string,
  data: unknown,
  accessToken?: string,
): Promise<T> {
  const storedAuth = readStoredAuth()
  const token = accessToken || storedAuth.tokens?.accessToken

  return makeRequest<T>(
    endpoint,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    token,
  )
}

