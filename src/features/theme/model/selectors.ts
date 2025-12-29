import type { RootState } from '@/app/store/store'

export const selectTheme = (state: RootState) => state.theme.theme

