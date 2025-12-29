import { DEFAULT_LOCALE } from '../config/constants'

export function formatDate(date: Date | string, locale: string = DEFAULT_LOCALE): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj)
}

