import { SummaryCards } from './SummaryCards'
import { WorkingCapitalChart } from './WorkingCapitalChart'
import { WalletCards } from './WalletCards'
import { ScheduledTransfers } from './ScheduledTransfers'
import { RecentTransactionsTable } from './RecentTransactionsTable'

export function DashboardHomeView() {
  return (
    <div className="w-full max-w-full grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1fr_minmax(0,400px)]">
      <div className="space-y-4 sm:space-y-6 min-w-0">
        <SummaryCards />
        <WorkingCapitalChart />
        <div className="mt-4 sm:mt-6">
          <RecentTransactionsTable limit={3} />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 xl:mt-0 min-w-0">
        <WalletCards />
        <ScheduledTransfers />
      </div>
    </div>
  )
}

