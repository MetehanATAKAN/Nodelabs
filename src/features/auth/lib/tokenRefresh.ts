import { postJson } from '@/shared/api/httpClient'
import { store } from '@/app/store/store'
import { authActions } from '../model/authSlice'

let refreshPromise: Promise<string> | null = null
let isRefreshing = false

export async function refreshAccessToken(): Promise<string> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise
  }

  isRefreshing = true
  refreshPromise = postJson<{ accessToken: string }>('/users/refresh-token', {}, undefined)
    .then((response) => {
      const newAccessToken = response.accessToken
      store.dispatch(authActions.setAccessToken(newAccessToken))
      return newAccessToken
    })
    .catch((error) => {
      store.dispatch(authActions.signOut())
      window.location.href = '/sign-in'
      throw error
    })
    .finally(() => {
      isRefreshing = false
      refreshPromise = null
    })

  return refreshPromise
}

