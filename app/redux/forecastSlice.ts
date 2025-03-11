import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchForecast } from 'api/fetchBulk';

export const fetchForecastData = createAsyncThunk(
  'weather/fetchForecast',
  // async () => {
  //   const forecastData = await fetchForecast();

  //   return forecastData;
  // }
  () => []
);

type InitialStateType = {
  data: any;
  status: 'idle' | 'failed' | 'loading' | 'succeeded';
  error: string | undefined | null;
};

const initialState: InitialStateType = {
  data: {},
  status: 'idle',
  error: null,
};

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecastData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecastData.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(fetchForecastData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = forecastSlice.actions;
export const forecastReducer = forecastSlice.reducer;
