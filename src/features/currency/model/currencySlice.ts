import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Currency =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'TRY'
  | 'JPY'
  | 'CHF'
  | 'CNY'
  | 'INR'
  | 'BRL'
  | 'RUB'
  | 'MXN'
  | 'CAD'
  | 'AUD'
  | 'KRW'
  | 'SGD'
  | 'HKD'
  | 'NZD'
  | 'ZAR'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'CZK'
  | 'HUF'

type CurrencyState = {
  currency: Currency
}

const initialState: CurrencyState = {
  currency: 'USD',
}

const slice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload
    },
  },
})

export const currencyActions = slice.actions
export const currencyReducer = slice.reducer

