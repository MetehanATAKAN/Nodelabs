import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, AuthUser, AuthTokens } from './types'
import { readStoredAuth, writeStoredAuth } from './storage'

const initialState: AuthState = readStoredAuth()

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: AuthUser; tokens: AuthTokens }>) {
      state.user = action.payload.user
      state.tokens = action.payload.tokens
      writeStoredAuth({ user: state.user, tokens: state.tokens })
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      writeStoredAuth({ user: state.user, tokens: state.tokens })
    },
    setAccessToken(state, action: PayloadAction<string>) {
      if (state.tokens) {
        state.tokens.accessToken = action.payload
        writeStoredAuth({ user: state.user, tokens: state.tokens })
      }
    },
    signOut(state) {
      state.user = null
      state.tokens = null
      writeStoredAuth({ user: null, tokens: null })
    },
  },
})

export const authActions = slice.actions
export const authReducer = slice.reducer

