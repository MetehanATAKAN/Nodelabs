import { useScheduledTransfersQuery } from "../api/useDashboardQueries";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { ErrorState } from "@/shared/ui/ErrorState/ErrorState";
import { useFormatCurrency } from "@/shared/lib/useFormatCurrency";
import { useFormatDateTime } from "@/features/dateFormat/lib/useFormatDateTime";
import { DEFAULT_LOCALE } from "@/shared/config/constants";

export function ScheduledTransfers() {
  const scheduledTransfersQuery = useScheduledTransfersQuery();
  const locale = DEFAULT_LOCALE;
  const formatCurrency = useFormatCurrency();
  const formatDateTime = useFormatDateTime();
  
  const formatAmount = (amount: number, currency: string): string => {
    const absAmount = Math.abs(amount);
    const formatted = formatCurrency(absAmount, currency, locale);
    return `- ${formatted.replace(".", ",")}`;
  };

  if (scheduledTransfersQuery.isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 border border-[#F5F5F5] dark:border-slate-700 rounded-[10px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1B212D] dark:text-white">
            Scheduled Transfers
          </h2>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>
    );
  }

  if (scheduledTransfersQuery.isError) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 border border-[#F5F5F5] dark:border-slate-700 rounded-[10px]">
        <h2 className="text-lg font-semibold text-[#1B212D] dark:text-white">
          Scheduled Transfers
        </h2>
        <ErrorState
          message="Failed to load scheduled transfers."
          onRetry={() => scheduledTransfersQuery.refetch()}
          className="mt-4"
        />
      </div>
    );
  }

  const transfers = scheduledTransfersQuery.data!;

  return (
    <section className="bg-white dark:bg-slate-800 p-4 sm:p-6" aria-labelledby="scheduled-transfers-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="scheduled-transfers-heading" className="text-lg font-semibold text-[#1B212D] dark:text-white">
          Scheduled Transfers
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-[#29A073] hover:underline shrink-0 focus:outline-none focus:ring-2 focus:ring-[#29A073] focus:ring-offset-2 rounded"
          aria-label="View all scheduled transfers"
        >
          View All &gt;
        </button>
      </div>
      <div className="space-y-3">
        {transfers.length === 0 ? (
          <p className="py-4 text-center text-sm text-slate-500">
            No scheduled transfers.
          </p>
        ) : (
          transfers.map((transfer) => (
            <div
              key={transfer.id}
              className="flex items-center justify-between rounded-lg py-2 gap-3"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {transfer.image ? (
                  <img
                    src={transfer.image}
                    alt={transfer.name}
                    className="rounded-full object-cover shrink-0 w-[33px] h-[33px]"
                  />
                ) : (
                  <div className="rounded-full bg-slate-200 flex items-center justify-center shrink-0 w-[33px] h-[33px]">
                    <span className="text-xs font-semibold text-slate-600">
                      {transfer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1B212D] dark:text-white">
                    {transfer.name}
                  </p>
                  <p className="mt-1 truncate text-xs font-medium text-[#929EAE] dark:text-slate-400">
                    {formatDateTime(transfer.date)}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-base font-semibold text-black dark:text-white">
                  {formatAmount(transfer.amount, transfer.currency, locale)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
