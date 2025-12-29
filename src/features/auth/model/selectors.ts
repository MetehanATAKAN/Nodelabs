import type { RootState } from '@/app/store/store'

export const selectAuthUser = (state: RootState) => state.auth.user
export const selectAuthTokens = (state: RootState) => state.auth.tokens

