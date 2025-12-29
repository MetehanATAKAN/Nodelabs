import { Moon, Sun } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { selectTheme } from '../model/selectors'
import { themeActions } from '../model/themeSlice'
import { cn } from '@/shared/lib/cn'

export function ThemeToggle() {
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  return (
    <button
      type="button"
      onClick={() => dispatch(themeActions.toggleTheme())}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl",
        "bg-white dark:bg-slate-800",
        "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
        "hover:bg-slate-50 dark:hover:bg-slate-700",
        "transition-colors",
        "shrink-0"
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}

