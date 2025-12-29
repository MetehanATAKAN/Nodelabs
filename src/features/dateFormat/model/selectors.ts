import type { RootState } from '@/app/store/store'

export const selectDateFormat = (state: RootState) => state.dateFormat.format

