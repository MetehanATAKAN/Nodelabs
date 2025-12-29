import { type ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { Button } from '../Button/Button'
import { RefreshCcw } from 'lucide-react'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-slate-900 p-8">
      <div className="max-w-md text-center">
        <RefreshCcw className="mx-auto h-16 w-16 text-slate-400" aria-hidden="true" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button onClick={resetErrorBoundary} variant="primary">
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = '/dashboard')}
            variant="secondary"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  if (fallback) {
    return (
      <ReactErrorBoundary fallback={fallback}>
        {children}
      </ReactErrorBoundary>
    )
  }

  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  )
}
