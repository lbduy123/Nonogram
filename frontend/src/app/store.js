import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import nonogramReducer from '../features/nonograms/nonogramSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    nonograms: nonogramReducer,
  },
})