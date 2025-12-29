import { useMutation } from '@tanstack/react-query'
import { useAppDispatch } from '@/app/store/hooks'
import { authActions } from '../model/authSlice'
import { authApi } from './authApi'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function useSignInMutation() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      dispatch(authActions.setCredentials(data))
      toast.success('Signed in successfully')
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to sign in')
    },
  })
}

