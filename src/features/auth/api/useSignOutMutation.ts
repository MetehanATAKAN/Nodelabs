import { useMutation } from '@tanstack/react-query'
import { useAppDispatch } from '@/app/store/hooks'
import { authActions } from '../model/authSlice'
import { authApi } from './authApi'
import { useNavigate } from 'react-router-dom'
import { useAccessToken } from '../lib/useAccessToken'
import toast from 'react-hot-toast'

export function useSignOutMutation() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const accessToken = useAccessToken()

  return useMutation({
    mutationFn: () => {
      if (!accessToken) throw new Error('No access token')
      return authApi.signOut(accessToken)
    },
    onSuccess: () => {
      dispatch(authActions.signOut())
      toast.success('Signed out successfully')
      navigate('/sign-in')
    },
    onError: (error: Error) => {
      dispatch(authActions.signOut())
      toast.error(error.message || 'Failed to sign out')
      navigate('/sign-in')
    },
  })
}

