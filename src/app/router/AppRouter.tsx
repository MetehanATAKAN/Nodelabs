import { createBrowserRouter, RouterProvider, Navigate, useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { AuthLayout } from '@/pages/auth/AuthLayout'
import { SignInPage } from '@/pages/auth/SignInPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'
import { DashboardLayout } from '@/pages/dashboard/DashboardLayout'
import { DashboardHomeView } from '@/features/dashboard/ui/DashboardHomeView'
import { ProtectedRoute, PublicRoute } from './guards'
import { Button } from '@/shared/ui/Button/Button'

function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-slate-900">{error.status}</h1>
          <p className="mt-2 text-sm text-slate-600">{error.statusText || error.data?.message || 'Page not found'}</p>
          <Button onClick={() => (window.location.href = '/dashboard')} className="mt-6" variant="primary">
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-600">
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
        <Button onClick={() => (window.location.href = '/dashboard')} className="mt-6" variant="primary">
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/sign-in', element: <SignInPage /> },
          { path: '/sign-up', element: <SignUpPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <DashboardHomeView /> },
          { path: '/transactions', element: <div>Transactions Page</div> },
          { path: '/invoices', element: <div>Invoices Page</div> },
          { path: '/wallets', element: <div>Wallets Page</div> },
          { path: '/settings', element: <div>Settings Page</div> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}

