import { useCallback } from 'react'
import { useAppSelector } from '@/app/store/hooks'
import { selectDateFormat } from '../model/selectors'
import { formatDateByFormat } from '@/shared/lib/formatDateByFormat'

export function useFormatDateTime() {
  const format = useAppSelector(selectDateFormat)

  return useCallback(
    (date: Date | string) => {
      return formatDateByFormat(date, format, true)
    },
    [format],
  )
}

