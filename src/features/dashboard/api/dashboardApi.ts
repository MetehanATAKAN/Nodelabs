import { getJson } from '@/shared/api/http'

type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

type FinancialAmount = {
  amount: number
  currency: string
  change: {
    percentage: number
    trend: 'up' | 'down'
  }
}

export type SummaryData = {
  totalBalance: FinancialAmount
  totalExpense: FinancialAmount
  totalSavings: FinancialAmount
  LastUpdated: string
}

export type WalletCard = {
  id: string
  name: string
  type: 'credit' | 'debit'
  cardNumber: string
  bank: string
  network: 'Visa' | 'Mastercard'
  expiryMonth: number
  expiryYear: number
  color: string
  isDefault: boolean
}

export type WorkingCapitalDataPoint = {
  month: string
  income: number
  expense: number
  net: number
}

export type WorkingCapitalData = {
  period: string
  currency: string
  data: WorkingCapitalDataPoint[]
  summary: {
    totalIncome: number
    totalExpense: number
    netBalance: number
  }
}

export type ScheduledTransfer = {
  id: string
  name: string
  image: string
  date: string
  amount: number
  currency: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

export type Transaction = {
  id: string
  name: string
  business: string
  image: string
  type: string
  amount: number
  currency: string
  date: string
  status: string
}

export const dashboardApi = {
  async getSummary(accessToken: string): Promise<SummaryData> {
    const response = await getJson<ApiResponse<SummaryData>>('/financial/summary', accessToken)
    return response.data
  },

  async getWalletCards(accessToken: string): Promise<WalletCard[]> {
    const response = await getJson<ApiResponse<{ cards: WalletCard[] }>>('/financial/wallet', accessToken)
    return response.data.cards
  },

  async getWorkingCapital(accessToken: string): Promise<WorkingCapitalData> {
    const response = await getJson<ApiResponse<WorkingCapitalData>>('/financial/working-capital', accessToken)
    return response.data
  },

  async getScheduledTransfers(accessToken: string): Promise<ScheduledTransfer[]> {
    const response = await getJson<ApiResponse<{ transfers: ScheduledTransfer[] }>>('/financial/transfers/scheduled', accessToken)
    return response.data.transfers
  },

  async getRecentTransactions(accessToken: string, limit: number = 20): Promise<Transaction[]> {
    const response = await getJson<ApiResponse<{ transactions: Transaction[] }>>(`/financial/transactions/recent?limit=${limit}`, accessToken)
    return response.data.transactions
  },
}
