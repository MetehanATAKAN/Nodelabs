import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from './dashboardApi'
import { useAccessToken } from '@/features/auth/lib/useAccessToken'

export function useSummaryQuery() {
  const accessToken = useAccessToken()
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => {
      return dashboardApi.getSummary(accessToken || '')
    },
    retry: false,
  })
}

export function useWalletCardsQuery() {
  const accessToken = useAccessToken()
  return useQuery({
    queryKey: ['dashboard', 'wallet-cards'],
    queryFn: () => {
      return dashboardApi.getWalletCards(accessToken || '')
    },
    retry: false,
  })
}

export function useWorkingCapitalQuery() {
  const accessToken = useAccessToken()
  return useQuery({
    queryKey: ['dashboard', 'working-capital'],
    queryFn: () => {
      return dashboardApi.getWorkingCapital(accessToken || '')
    },
    retry: false,
  })
}

export function useScheduledTransfersQuery() {
  const accessToken = useAccessToken()
  return useQuery({
    queryKey: ['dashboard', 'scheduled-transfers'],
    queryFn: () => {
      return dashboardApi.getScheduledTransfers(accessToken || '')
    },
    retry: false,
  })
}

export function useRecentTransactionsQuery(limit?: number) {
  const accessToken = useAccessToken()
  return useQuery({
    queryKey: ['dashboard', 'recent-transactions', limit],
    queryFn: () => {
      return dashboardApi.getRecentTransactions(accessToken || '', limit)
    },
    retry: false,
  })
}

