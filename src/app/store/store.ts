import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@/features/auth/model/authSlice'
import { currencyReducer } from '@/features/currency/model/currencySlice'
import { dateFormatReducer } from '@/features/dateFormat/model/dateFormatSlice'
import { themeReducer } from '@/features/theme/model/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currency: currencyReducer,
    dateFormat: dateFormatReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

