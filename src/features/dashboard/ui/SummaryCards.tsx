import { useSummaryQuery } from '../api/useDashboardQueries'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState'
import { useFormatCurrency } from '@/shared/lib/useFormatCurrency'
import { DEFAULT_LOCALE } from '@/shared/config/constants'
import totalBalanceIcon from '@/assets/totalBalanceIcon.png'
import totalSpendingIcon from '@/assets/totalSpendingIcon.png'
import totalSavedIcon from '@/assets/totalSavedIcon.png'

export function SummaryCards() {
  const summaryQuery = useSummaryQuery()
  const locale = DEFAULT_LOCALE
  const formatCurrency = useFormatCurrency()

  if (summaryQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    )
  }

  if (summaryQuery.isError) {
    return (
      <ErrorState
        message="Failed to load summary data."
        onRetry={() => summaryQuery.refetch()}
      />
    )
  }

  const data = summaryQuery.data!

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3" aria-label="Financial summary">
      <article className="rounded-2xl p-4 sm:p-6 bg-[#363A3F]" aria-labelledby="total-balance">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#C8EE44] opacity-20"></div>
            <div className="relative rounded-full p-2 bg-[#4E5257]">
              <img src={totalBalanceIcon} alt="Total Balance icon" className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p id="total-balance" className="text-sm font-medium text-[#929EAE]">Total Balance</p>
            <p className="mt-2 text-xl lg:text-2xl font-bold text-white truncate" aria-label={`Total Balance: ${formatCurrency(data.totalBalance.amount, data.totalBalance.currency, locale)}`}>
              {formatCurrency(data.totalBalance.amount, data.totalBalance.currency, locale)}
            </p>
          </div>
        </div>
      </article>

      <article className="rounded-2xl p-4 sm:p-6 bg-[#F8F8F8] dark:bg-slate-800" aria-labelledby="total-spending">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <div className="relative rounded-full bg-slate-100 dark:bg-slate-700 p-2">
              <img src={totalSpendingIcon} alt="Total Spending icon" className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p id="total-spending" className="text-sm font-medium text-[#929EAE] dark:text-slate-400">Total Spending</p>
            <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate" aria-label={`Total Spending: ${formatCurrency(data.totalExpense.amount, data.totalExpense.currency, locale)}`}>
              {formatCurrency(data.totalExpense.amount, data.totalExpense.currency, locale)}
            </p>
          </div>
        </div>
      </article>

      <article className="rounded-2xl p-4 sm:p-6 bg-[#F8F8F8] dark:bg-slate-800" aria-labelledby="total-saved">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <div className="relative rounded-full bg-slate-100 dark:bg-slate-700 p-2">
              <img src={totalSavedIcon} alt="Total Saved icon" className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p id="total-saved" className="text-sm font-medium text-[#929EAE] dark:text-slate-400">Total Saved</p>
            <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate" aria-label={`Total Saved: ${formatCurrency(data.totalSavings.amount, data.totalSavings.currency, locale)}`}>
              {formatCurrency(data.totalSavings.amount, data.totalSavings.currency, locale)}
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}

