import { useState } from 'react'
import { useWorkingCapitalQuery } from '../api/useDashboardQueries'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState'
import { DEFAULT_LOCALE } from '@/shared/config/constants'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useFormatCurrency } from '@/shared/lib/useFormatCurrency'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'

export function WorkingCapitalChart() {
  const [period, setPeriod] = useState('last7Days')
  const workingCapitalQuery = useWorkingCapitalQuery()
  const locale = DEFAULT_LOCALE
  const formatCurrency = useFormatCurrency()

  if (workingCapitalQuery.isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 border border-[#F5F5F5] dark:border-slate-700 rounded-[10px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1B212D] dark:text-white">Working Capital</h2>
        </div>
        <div className="mt-4 h-[250px]">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>
      </div>
    )
  }

  if (workingCapitalQuery.isError) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 border border-[#F5F5F5] dark:border-slate-700 rounded-[10px]">
        <h2 className="text-lg font-semibold text-[#1B212D] dark:text-white">Working Capital</h2>
        <ErrorState
          message="Failed to load working capital data."
          onRetry={() => workingCapitalQuery.refetch()}
          className="h-[250px]"
        />
      </div>
    )
  }

  const workingCapitalData = workingCapitalQuery.data!
  const chartData = workingCapitalData.data.map((item) => ({
    month: item.month,
    income: item.income,
    expense: item.expense,
  }))

  const formatYAxisTick = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toString()
  }

  const formatTooltipValue = (value: number) => {
    return formatCurrency(value, workingCapitalData.currency, locale)
  }

  const formatMonthLabel = (month: string) => {
    if (!month) return ''
    try {
      const date = new Date(month)
      if (isNaN(date.getTime())) {
        return month
      }
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${monthNames[date.getMonth()]} ${date.getDate()}`
    } catch {
      return month
    }
  }

  return (
    <section className="bg-white dark:bg-slate-800 p-4 sm:p-6 border border-[#F5F5F5] dark:border-slate-700 rounded-[10px]" aria-labelledby="working-capital-heading">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 id="working-capital-heading" className="text-lg font-semibold text-[#1B212D] dark:text-white">Working Capital</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
          <div className="flex items-center gap-4 sm:gap-8" role="list" aria-label="Chart legend">
            <div className="flex items-center gap-1.5" role="listitem">
              <div className="h-2 w-2 rounded-full bg-[#29A073]" aria-hidden="true"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Income</span>
            </div>
            <div className="flex items-center gap-1.5" role="listitem">
              <div className="h-2 w-2 rounded-full bg-[#C8EE44]" aria-hidden="true"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Expenses</span>
            </div>
          </div>
          <Dropdown
            options={[
              { value: 'last7Days', label: 'Last 7 days' },
            ]}
            value={period}
            onChange={(value) => setPeriod(value)}
            className="w-full sm:w-[140px]"
            triggerClassName="h-8 text-xs"
          />
        </div>
      </div>
      <div className="mt-4 h-[200px] sm:h-[250px]">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-500">No data available.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tickFormatter={formatMonthLabel}
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatYAxisTick}
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax']}
              />
              <Tooltip
                formatter={formatTooltipValue}
                labelFormatter={formatMonthLabel}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#29A073"
                strokeWidth={2}
                dot={false}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#C8EE44"
                strokeWidth={2}
                dot={false}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}

