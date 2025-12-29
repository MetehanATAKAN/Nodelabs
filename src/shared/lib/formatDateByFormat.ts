import { DateFormat } from '@/features/dateFormat/model/dateFormatSlice'

const MONTH_NAMES_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function formatDateByFormat(date: Date | string, format: DateFormat, includeTime = false): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    return ''
  }

  const day = dateObj.getDate()
  const month = dateObj.getMonth()
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const displayHours = hours % 12 || 12
  const displayMinutes = minutes.toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'

  const dayStr = day.toString().padStart(2, '0')
  const monthStr = (month + 1).toString().padStart(2, '0')
  const monthNameFull = MONTH_NAMES_FULL[month]
  const monthNameShort = MONTH_NAMES_SHORT[month]

  let formatted = ''

  switch (format) {
    case 'MM/DD/YYYY':
      formatted = `${monthStr}/${dayStr}/${year}`
      break
    case 'DD/MM/YYYY':
      formatted = `${dayStr}/${monthStr}/${year}`
      break
    case 'YYYY-MM-DD':
      formatted = `${year}-${monthStr}-${dayStr}`
      break
    case 'DD Mon YYYY':
      formatted = `${dayStr} ${monthNameShort} ${year}`
      break
    case 'Mon DD, YYYY':
      formatted = `${monthNameShort} ${day}, ${year}`
      break
    case 'DD Month YYYY':
      formatted = `${dayStr} ${monthNameFull} ${year}`
      break
    case 'Month DD, YYYY':
      formatted = `${monthNameFull} ${day}, ${year}`
      break
    case 'DD.MM.YYYY':
      formatted = `${dayStr}.${monthStr}.${year}`
      break
    case 'YYYY/MM/DD':
      formatted = `${year}/${monthStr}/${dayStr}`
      break
    case 'DD-MM-YYYY':
      formatted = `${dayStr}-${monthStr}-${year}`
      break
    case 'Month DD, YYYY at HH:MM AM/PM':
      formatted = `${monthNameFull} ${day}, ${year} at ${displayHours}:${displayMinutes} ${ampm}`
      break
    case 'DD Mon YYYY, HH:MM AM/PM':
      formatted = `${dayStr} ${monthNameShort} ${year}, ${displayHours}:${displayMinutes} ${ampm}`
      break
    default:
      formatted = `${monthStr}/${dayStr}/${year}`
  }

  if (includeTime && !formatted.includes('at') && !formatted.includes('AM') && !formatted.includes('PM')) {
    if (format.includes('Mon') || format.includes('Month')) {
      formatted += `, ${displayHours}:${displayMinutes} ${ampm}`
    } else {
      formatted += ` ${displayHours}:${displayMinutes} ${ampm}`
    }
  }

  return formatted
}

