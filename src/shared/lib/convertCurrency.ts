import { Currency } from '@/features/currency/model/currencySlice'

type ExchangeRates = Record<Currency, number>

const EXCHANGE_RATES: ExchangeRates = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  TRY: 34.5,
  JPY: 151.5,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.2,
  BRL: 5.05,
  RUB: 92.5,
  MXN: 17.1,
  CAD: 1.36,
  AUD: 1.52,
  KRW: 1335.0,
  SGD: 1.35,
  HKD: 7.82,
  NZD: 1.66,
  ZAR: 18.9,
  SEK: 10.6,
  NOK: 10.8,
  DKK: 6.87,
  PLN: 4.02,
  CZK: 23.1,
  HUF: 365.0,
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: Currency,
): number {
  const normalizedFrom = normalizeCurrencyCode(fromCurrency)
  const normalizedTo = toCurrency

  if (normalizedFrom === normalizedTo) {
    return amount
  }

  const fromRate = (normalizedFrom in EXCHANGE_RATES ? EXCHANGE_RATES[normalizedFrom as Currency] : 1.0)
  const toRate = EXCHANGE_RATES[normalizedTo] || 1.0

  const amountInUSD = amount / fromRate
  const convertedAmount = amountInUSD * toRate

  return Math.round(convertedAmount * 100) / 100
}

function normalizeCurrencyCode(currency: string): string {
  const normalized = currency.trim().toUpperCase()

  const currencyMap: Record<string, string> = {
    $: 'USD',
    S: 'USD',
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

  if (currencyMap[currency]) {
    return currencyMap[currency]
  }

  if (currencyMap[normalized]) {
    return currencyMap[normalized]
  }

  if (normalized.length === 3 && /^[A-Z]{3}$/.test(normalized)) {
    return normalized
  }

  return 'USD'
}

export function getExchangeRate(fromCurrency: string, toCurrency: Currency): number {
  const normalizedFrom = normalizeCurrencyCode(fromCurrency)
  const normalizedTo = toCurrency

  if (normalizedFrom === normalizedTo) {
    return 1.0
  }

  const fromRate = (normalizedFrom in EXCHANGE_RATES ? EXCHANGE_RATES[normalizedFrom as Currency] : 1.0)
  const toRate = EXCHANGE_RATES[normalizedTo] || 1.0

  return toRate / fromRate
}

