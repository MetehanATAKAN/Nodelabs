import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { store } from '../store/store'
import { queryClient } from '../query/queryClient'
import { themeActions } from '@/features/theme/model/themeSlice'

type AppProvidersProps = {
  children: React.ReactNode
}

function ThemeInitializer({ children }: AppProvidersProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    
    let theme: 'light' | 'dark' = 'light'
    if (stored === 'light' || stored === 'dark') {
      theme = stored
    }
    
    dispatch(themeActions.setTheme(theme))
  }, [dispatch])

  return <>{children}</>
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeInitializer>
            {children}
            <Toaster position="top-right" />
          </ThemeInitializer>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  )
}

