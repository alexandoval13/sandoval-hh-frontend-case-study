import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather } from 'api/fetchWeather';
import type { CurrentWeather } from '~/types/weather';
import type { RootState } from './store';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeather',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const locations = state.databaseData.locations.data;

    const weatherData = await Promise.all(
      locations.map(async (location) => {
        const data = await fetchWeather(location.lat, location.lon);
        return { locationId: location.id, weather: data };
      })
    );

    return weatherData;
  }
);

type InitialStateType = {
  data: {
    [key: string]: CurrentWeather;
  };
  status: 'idle' | 'failed' | 'loading' | 'succeeded';
  error: string | undefined | null;
};

const initialState: InitialStateType = {
  data: {},
  status: 'idle',
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateWeatherData: (state, action) => {
      action.payload.forEach(({ locationId, weather }) => {
        state.data[locationId] = weather;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.forEach(({ locationId, weather }) => {
          state.data[locationId] = weather;
        });
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateWeatherData } = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
