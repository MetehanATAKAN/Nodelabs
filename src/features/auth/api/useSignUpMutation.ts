import { useMutation } from '@tanstack/react-query'
import { authApi } from './authApi'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function useSignUpMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: () => {
      toast.success('Account created successfully. Please sign in.')
      navigate('/sign-in')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to sign up')
    },
  })
}

