import { useState, useMemo } from 'react'
import { useRecentTransactionsQuery } from '../api/useDashboardQueries'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState'
import { useFormatCurrency } from '@/shared/lib/useFormatCurrency'
import { useAppSelector } from '@/app/store/hooks'
import { selectCurrency } from '@/features/currency/model/selectors'
import { useFormatDate } from '@/features/dateFormat/lib/useFormatDate'
import { DEFAULT_LOCALE } from '@/shared/config/constants'

type RecentTransactionsTableProps = {
  limit?: number
}

export function RecentTransactionsTable({ limit = 10 }: RecentTransactionsTableProps) {
  const [currentLimit, setCurrentLimit] = useState(limit)
  const recentTransactionsQuery = useRecentTransactionsQuery(currentLimit)
  const locale = DEFAULT_LOCALE
  const formatCurrency = useFormatCurrency()
  const selectedCurrency = useAppSelector(selectCurrency)
  const formatDate = useFormatDate()

  const columns = useMemo(
    () => [
      {
        header: 'NAME/BUSINESS',
        align: 'left' as const,
        accessor: (t: { name: string; business?: string; image?: string }) => (
          <div className="flex items-center gap-3">
            {t.image && (
              <img src={t.image} alt={t.name} className="h-10 w-10 rounded" />
            )}
            <div>
              <span className="text-sm font-medium text-[#1B212D]">{t.name}</span>
              {t.business && (
                <p className="mt-0.5 text-xs font-normal text-[#929EAE]">{t.business}</p>
              )}
            </div>
          </div>
        ),
      },
      {
        header: 'TYPE',
        align: 'center' as const,
        accessor: (t: { type: string }) => (
          <span className="text-sm font-medium text-[#929EAE]">{t.type}</span>
        ),
      },
      {
        header: 'AMOUNT',
        align: 'center' as const,
        accessor: (t: { amount: number; currency: string }) => (
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {formatCurrency(Math.abs(t.amount), t.currency, locale)}
          </span>
        ),
      },
      {
        header: 'DATE',
        align: 'center' as const,
        accessor: (t: { date: string }) => (
          <span className="text-sm font-medium text-[#929EAE]">{formatDate(t.date)}</span>
        ),
      },
    ],
    [locale, formatCurrency, selectedCurrency, formatDate],
  )

  if (recentTransactionsQuery.isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 border border-[#F5F5F5] dark:border-slate-700 rounded-[10px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1B212D] dark:text-white">Recent Transaction</h2>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>
    )
  }

  if (recentTransactionsQuery.isError) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 border border-[#F5F5F5] dark:border-slate-700 rounded-[10px]">
        <h2 className="text-lg font-semibold text-[#1B212D] dark:text-white">Recent Transaction</h2>
        <ErrorState
          message="Failed to load recent transactions."
          onRetry={() => recentTransactionsQuery.refetch()}
          className="mt-4"
        />
      </div>
    )
  }

  const transactions = recentTransactionsQuery.data ?? []

  return (
    <section className="bg-white dark:bg-slate-800 p-4 sm:p-6 border border-[#F5F5F5] dark:border-slate-700 rounded-[10px]" aria-labelledby="recent-transactions-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="recent-transactions-heading" className="text-lg font-semibold text-[#1B212D] dark:text-white">Recent Transaction</h2>
        {transactions.length >= limit && currentLimit === limit && (
          <button
            type="button"
            onClick={() => setCurrentLimit(20)}
            className="text-xs font-semibold text-[#29A073] hover:underline shrink-0 focus:outline-none focus:ring-2 focus:ring-[#29A073] focus:ring-offset-2 rounded"
            aria-label="View all transactions"
          >
            View All &gt;
          </button>
        )}
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-[600px]" role="table" aria-label="Recent transactions">
          <thead>
            <tr role="row">
              {columns.map((col) => (
                <th key={col.header} role="columnheader" scope="col" className={`px-2 sm:px-4 py-3 text-xs font-semibold text-[#929EAE] ${col.align === 'left' ? 'text-left' : 'text-center'}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr role="row">
                <td colSpan={columns.length} role="cell" className="px-4 py-8 text-center text-sm text-slate-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} role="row" className="border-b border-[#F5F5F5] dark:border-slate-700">
                  {columns.map((col) => (
                    <td key={col.header} role="cell" className={`px-2 sm:px-4 py-4 ${col.align === 'left' ? 'text-left' : 'text-center'}`}>
                      {col.accessor(transaction)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

