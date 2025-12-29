import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { currencyActions } from '../model/currencySlice'
import { selectCurrency } from '../model/selectors'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'
import type { Currency } from '../model/currencySlice'

const CURRENCY_OPTIONS: Array<{ value: Currency; label: string }> = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'JPY', label: 'JPY (¥)' },
  { value: 'CHF', label: 'CHF (CHF)' },
  { value: 'CNY', label: 'CNY (¥)' },
  { value: 'INR', label: 'INR (₹)' },
  { value: 'BRL', label: 'BRL (R$)' },
  { value: 'RUB', label: 'RUB (₽)' },
  { value: 'MXN', label: 'MXN ($)' },
  { value: 'CAD', label: 'CAD ($)' },
  { value: 'AUD', label: 'AUD ($)' },
  { value: 'KRW', label: 'KRW (₩)' },
  { value: 'SGD', label: 'SGD ($)' },
  { value: 'HKD', label: 'HKD ($)' },
  { value: 'NZD', label: 'NZD ($)' },
  { value: 'ZAR', label: 'ZAR (R)' },
  { value: 'SEK', label: 'SEK (kr)' },
  { value: 'NOK', label: 'NOK (kr)' },
  { value: 'DKK', label: 'DKK (kr)' },
  { value: 'PLN', label: 'PLN (zł)' },
  { value: 'CZK', label: 'CZK (Kč)' },
  { value: 'HUF', label: 'HUF (Ft)' },
  { value: 'TRY', label: 'TRY (₺)' },
]

export function CurrencySelector() {
  const dispatch = useAppDispatch()
  const selectedCurrency = useAppSelector(selectCurrency)

  return (
    <Dropdown<Currency>
      options={CURRENCY_OPTIONS}
      value={selectedCurrency}
      onChange={(currency) => dispatch(currencyActions.setCurrency(currency))}
      ariaLabel="Select currency"
      className="shrink-0"
      triggerClassName="h-10 text-xs"
      menuClassName="max-h-[300px]"
    />
  )
}

