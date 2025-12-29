import { useCallback } from 'react'
import { useAppSelector } from '@/app/store/hooks'
import { selectCurrency } from '@/features/currency/model/selectors'
import { formatCurrency } from './formatCurrency'
import { DEFAULT_LOCALE } from '../config/constants'

export function useFormatCurrency() {
  const selectedCurrency = useAppSelector(selectCurrency)
  
  return useCallback(
    (value: number, currency: string, locale: string = DEFAULT_LOCALE) => {
      return formatCurrency(value, currency, locale, selectedCurrency)
    },
    [selectedCurrency],
  )
}

