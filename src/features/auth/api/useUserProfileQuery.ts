import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAppDispatch } from '@/app/store/hooks'
import { authActions } from '@/features/auth/model/authSlice'
import { authApi } from './authApi'
import { useAccessToken } from '../lib/useAccessToken'

export function useUserProfileQuery() {
  const dispatch = useAppDispatch()
  const accessToken = useAccessToken()

  const query = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => {
      if (!accessToken) throw new Error('No access token')
      return authApi.getProfile(accessToken)
    },
    enabled: Boolean(accessToken),
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (query.data && accessToken) {
      dispatch(authActions.setUser(query.data))
    }
  }, [query.data, accessToken, dispatch])

  return query
}

