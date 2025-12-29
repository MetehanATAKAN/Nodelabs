import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { dateFormatActions } from '../model/dateFormatSlice'
import { selectDateFormat } from '../model/selectors'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'
import type { DateFormat } from '../model/dateFormatSlice'

const DATE_FORMAT_OPTIONS: Array<{ value: DateFormat; label: string }> = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  { value: 'DD Mon YYYY', label: 'DD Mon YYYY' },
  { value: 'Mon DD, YYYY', label: 'Mon DD, YYYY' },
  { value: 'DD Month YYYY', label: 'DD Month YYYY' },
  { value: 'Month DD, YYYY', label: 'Month DD, YYYY' },
  { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY' },
  { value: 'YYYY/MM/DD', label: 'YYYY/MM/DD' },
  { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY' },
  { value: 'Month DD, YYYY at HH:MM AM/PM', label: 'Month DD, YYYY at HH:MM AM/PM' },
  { value: 'DD Mon YYYY, HH:MM AM/PM', label: 'DD Mon YYYY, HH:MM AM/PM' },
]

export function DateFormatSelector() {
  const dispatch = useAppDispatch()
  const selectedFormat = useAppSelector(selectDateFormat)

  return (
    <Dropdown<DateFormat>
      options={DATE_FORMAT_OPTIONS}
      value={selectedFormat}
      onChange={(format) => dispatch(dateFormatActions.setDateFormat(format))}
      ariaLabel="Select date format"
      className="shrink-0"
      triggerClassName="h-10 text-xs"
      menuClassName="max-h-[300px]"
    />
  )
}

