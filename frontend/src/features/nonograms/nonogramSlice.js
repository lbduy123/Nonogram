import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import nonogramService from './nonogramService'

const initialState = {
  allNonograms: [],
  allWorkshopNonograms: [],
  allCasualNonograms: [],
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
  'nonograms/getUserOnes',
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

// Get all Nonograms
export const getAllNonograms = createAsyncThunk(
  'nonograms/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await nonogramService.getAllNonograms(token)
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

// Get all casual Nonograms
export const getAllCasualNonograms = createAsyncThunk(
  'nonograms/getAllCasual',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await nonogramService.getAllCasualNonograms(token)
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

// Get workshop Nonograms
export const getAllWorkshopNonograms = createAsyncThunk(
  'nonograms/getAllWorkshop',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await nonogramService.getAllWorkshopNonograms(token)
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
export const updateNonogram = createAsyncThunk('nonograms/update', async (nonogram, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await nonogramService.updateNonogram(nonogram.id, nonogram.nonogramData, token)
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

// Update Nonogram Votes
export const updateNonogramVotes = createAsyncThunk('nonograms/updateVotes', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await nonogramService.updateNonogramVotes(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update Nonogram Played
export const updateNonogramPlayed = createAsyncThunk('nonograms/updatePlayed', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await nonogramService.updateNonogramPlayed(id, token)
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
      // Handle create Nonogram    
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

      // Handle get all user Nonograms
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

      // Handle get all Nonograms
      .addCase(getAllNonograms.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllNonograms.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allNonograms = action.payload
      })
      .addCase(getAllNonograms.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // Handle get all casual Nonograms
      .addCase(getAllCasualNonograms.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCasualNonograms.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allCasualNonograms = action.payload
      })
      .addCase(getAllCasualNonograms.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // Handle get all workshop Nonograms
      .addCase(getAllWorkshopNonograms.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllWorkshopNonograms.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allWorkshopNonograms = action.payload
      })
      .addCase(getAllWorkshopNonograms.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // Handle get user's Nonogram
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

      // Handle update user's Nonogram
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

      // Handle delete user's Nonogram
      .addCase(deleteNonogram.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNonogram.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nonograms = state.nonograms.filter(
          (nonogram) => nonogram._id !== action.payload.id
        )
        state.allNonograms = state.allNonograms.filter(
          (nonogram) => nonogram._id !== action.payload.id
        )
      })
      .addCase(deleteNonogram.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // Handle update Nonogram votes Array
      .addCase(updateNonogramVotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNonogramVotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nonogram = action.payload
      })
      .addCase(updateNonogramVotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // Handle update Nonogram played Object
      .addCase(updateNonogramPlayed.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNonogramPlayed.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nonogram = action.payload
      })
      .addCase(updateNonogramPlayed.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = nonogramSlice.actions
export default nonogramSlice.reducer