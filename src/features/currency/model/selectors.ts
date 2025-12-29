import type { RootState } from '@/app/store/store'

export const selectCurrency = (state: RootState) => state.currency.currency

