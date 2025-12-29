import { useCallback } from 'react'
import { useAppSelector } from '@/app/store/hooks'
import { selectDateFormat } from '../model/selectors'
import { formatDateByFormat } from '@/shared/lib/formatDateByFormat'

export function useFormatDate() {
  const format = useAppSelector(selectDateFormat)

  return useCallback(
    (date: Date | string) => {
      return formatDateByFormat(date, format, false)
    },
    [format],
  )
}

