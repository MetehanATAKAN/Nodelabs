import { RefreshCcw } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { Button } from '../Button/Button'

type ErrorStateProps = {
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ message = 'Something went wrong.', onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-6 text-center', className)}>
      <RefreshCcw className="h-10 w-10 text-slate-400" />
      <p className="mt-4 text-sm font-medium text-slate-700">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  )
}

