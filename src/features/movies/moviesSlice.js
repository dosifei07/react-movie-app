import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTrendingMovies, fetchMovieDetails } from '../../services/tmdbApi';

export const getTrending = createAsyncThunk(
  'movies/getTrending',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetchTrendingMovies(page);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.status_message || 'Error loading trends');
    }
  }
);

export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchMovieDetails(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.status_message || 'Error finding film');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    currentMovie: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrending.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTrending.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getTrending.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMovie = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentMovie } = moviesSlice.actions;
export default moviesSlice.reducer;