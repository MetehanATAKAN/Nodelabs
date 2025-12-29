import { useWalletCardsQuery } from "../api/useDashboardQueries";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { ErrorState } from "@/shared/ui/ErrorState/ErrorState";
import visaIcon from "@/assets/visa.png";
import mastercardIcon from "@/assets/mastercard.png";
import walletChipIcon from "@/assets/walletChip.png";
import walletWifiIcon from "@/assets/walletWifi.png";

export function WalletCards() {
  const walletCardsQuery = useWalletCardsQuery();

  if (walletCardsQuery.isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#1B212D]">
          Wallet
        </h2>
        <div className="relative h-[322px]">
          <Skeleton className="absolute left-0 top-0 h-[210px] w-full max-w-[354px] rounded-2xl" />
          <Skeleton className="absolute left-[15px] top-[150px] h-[172px] w-full max-w-[324px] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (walletCardsQuery.isError) {
    return (
      <ErrorState
        message="Failed to load wallet cards."
        onRetry={() => walletCardsQuery.refetch()}
        className="h-[322px]"
      />
    );
  }

  const cards = walletCardsQuery.data!;

  if (cards.length === 0) {
    return (
      <div className="flex h-[322px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <p className="text-sm text-slate-500">No wallet cards available.</p>
      </div>
    );
  }

  return (
    <section className="space-y-4" aria-labelledby="wallet-heading">
      <h2 id="wallet-heading" className="text-lg font-semibold text-[#1B212D] dark:text-white">
        Wallet
      </h2>
      <div className="relative h-[322px] w-full overflow-hidden">
        {cards.map((card, index) => {
          const isFirst = index === 0;
          const expiryDate = `${String(card.expiryMonth).padStart(
            2,
            "0"
          )}/${String(card.expiryYear).slice(-2)}`;
          const maskedCardNumber = isFirst
            ? card.cardNumber
            : `${card.cardNumber.slice(0, 8)}****`;

          return (
            <article
              key={card.id}
              className={`absolute rounded-2xl p-4 sm:p-6 text-white ${
                isFirst
                  ? "left-0 top-0 z-0 w-full max-w-[354px] h-[210px] bg-gradient-to-br from-[#4A4A49] to-[#20201F]"
                  : "left-[15px] top-[150px] z-10 w-[calc(100%-15px)] max-w-[324px] h-[172px] bg-gradient-to-b from-white/40 to-black/10 backdrop-blur-[10px]"
              }`}
              aria-label={`${card.bank} card ending in ${card.cardNumber.slice(-4)}`}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-normal text-white">
                      Fintech.{" "}
                      <span className={`text-base font-normal ml-0.5 ${isFirst ? "text-[#626260]" : "text-white"}`}>
                        |
                      </span>{" "}
                      <span className={`text-xs font-medium ml-0.5 ${isFirst ? "text-[#626260]" : "text-white"}`}>
                        {card.bank}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between my-2">
                  <img
                    src={walletChipIcon}
                    alt="Card chip"
                    className={`${isFirst ? "h-8 w-10" : "h-6 w-8"} ${
                      !isFirst ? "opacity-50" : ""
                    }`}
                  />
                  <img
                    src={walletWifiIcon}
                    alt="Contactless payment icon"
                    className={`h-8 w-6 ${isFirst ? "opacity-50" : ""}`}
                  />
                </div>

                <div className="mt-auto">
                  <div>
                    <p
                      className={`text-[17px] font-bold font-gordita tracking-[0.1em] ${
                        isFirst ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {maskedCardNumber}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isFirst ? "text-white" : "text-slate-600"
                        }`}
                      >
                        {expiryDate}
                      </p>
                    </div>
                    {isFirst && (
                      <img
                        src={mastercardIcon}
                        alt="Mastercard"
                        className="h-10 w-10 object-contain"
                      />
                    )}
                    {!isFirst && (
                      <img
                        src={visaIcon}
                        alt="Visa"
                        className="h-6 w-10 object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
