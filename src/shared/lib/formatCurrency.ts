import { DEFAULT_LOCALE } from '../config/constants'
import { convertCurrency } from './convertCurrency'
import { Currency } from '@/features/currency/model/currencySlice'

const CURRENCY_MAP: Record<string, string> = {
  '$': 'USD',
  'S': 'USD',
  '€': 'EUR',
  '£': 'GBP',
  '₺': 'TRY',
  '¥': 'JPY',
  '₹': 'INR',
  'R$': 'BRL',
  '₽': 'RUB',
  'kr': 'SEK',
  'zł': 'PLN',
  'Kč': 'CZK',
  'Ft': 'HUF',
}

function normalizeCurrency(currency: string): string {
  const normalized = currency.trim().toUpperCase()
  
  if (CURRENCY_MAP[currency]) {
    return CURRENCY_MAP[currency]
  }
  
  if (CURRENCY_MAP[normalized]) {
    return CURRENCY_MAP[normalized]
  }
  
  if (normalized.length === 3 && /^[A-Z]{3}$/.test(normalized)) {
    return normalized
  }
  
  return 'USD'
}

export function formatCurrency(
  value: number,
  currency: string,
  locale: string = DEFAULT_LOCALE,
  targetCurrency?: Currency,
): string {
  const normalizedCurrency = normalizeCurrency(currency)
  const displayCurrency = targetCurrency || normalizedCurrency
  
  let displayValue = value
  
  if (targetCurrency && normalizedCurrency !== targetCurrency) {
    displayValue = convertCurrency(value, normalizedCurrency, targetCurrency)
  }
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: displayCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(displayValue)
  } catch {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(displayValue)
  }
}

