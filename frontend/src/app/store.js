import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import nonogramReducer from '../features/nonograms/nonogramSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nonograms: nonogramReducer,
  },
})