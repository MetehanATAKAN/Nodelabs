import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectAuthUser } from '@/features/auth/model/selectors'

export function ProtectedRoute() {
  const user = useAppSelector(selectAuthUser)

  if (!user) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}

export function PublicRoute() {
  const user = useAppSelector(selectAuthUser)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

