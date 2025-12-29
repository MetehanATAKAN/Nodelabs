import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DateFormat =
  | 'MM/DD/YYYY'
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD'
  | 'DD Mon YYYY'
  | 'Mon DD, YYYY'
  | 'DD Month YYYY'
  | 'Month DD, YYYY'
  | 'DD.MM.YYYY'
  | 'YYYY/MM/DD'
  | 'DD-MM-YYYY'
  | 'Month DD, YYYY at HH:MM AM/PM'
  | 'DD Mon YYYY, HH:MM AM/PM'

type DateFormatState = {
  format: DateFormat
}

const initialState: DateFormatState = {
  format: 'DD Mon YYYY',
}

const slice = createSlice({
  name: 'dateFormat',
  initialState,
  reducers: {
    setDateFormat(state, action: PayloadAction<DateFormat>) {
      state.format = action.payload
    },
  },
})

export const dateFormatActions = slice.actions
export const dateFormatReducer = slice.reducer

