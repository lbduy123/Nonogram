import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import nonogramService from './nonogramService'

const initialState = {
  nonograms: [],
  nonogram: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create New Nonogram
export const createNonogram = createAsyncThunk('nonograms/create', async (nonogramData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await nonogramService.createNonogram(nonogramData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get user Nonograms
export const getNonograms = createAsyncThunk(
  'nonograms/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await nonogramService.getNonograms(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user Nonogram
export const getNonogram = createAsyncThunk(
  'nonograms/get',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await nonogramService.getNonogram(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update user Nonogram
export const updateNonogram = createAsyncThunk('nonograms/update', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await nonogramService.updateNonogram(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete user Nonogram
export const deleteNonogram = createAsyncThunk('nonograms/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await nonogramService.deleteNonogram(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const nonogramSlice = createSlice({
  name: 'nonogram',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNonogram.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNonogram.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nonograms.push(action.payload)
      })
      .addCase(createNonogram.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(getNonograms.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNonograms.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nonograms = action.payload
      })
      .addCase(getNonograms.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getNonogram.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNonogram.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nonogram = action.payload
      })
      .addCase(getNonogram.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(updateNonogram.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNonogram.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateNonogram.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(deleteNonogram.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNonogram.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nonograms = state.nonograms.filter(
          (nonogram) => nonogram._id !== action.payload.id
        )
      })
      .addCase(deleteNonogram.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = nonogramSlice.actions
export default nonogramSlice.reducer