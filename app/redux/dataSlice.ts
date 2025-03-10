import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFacilities, fetchLocations } from 'api/mockFetchFromDB';
import type { Facility } from '~/types/facility';
import type { Location } from '~/types/location';

export const fetchFacilitiesData = createAsyncThunk(
  'data/fetchFacilitiesData',
  async () => await fetchFacilities()
);

export const fetchLocationsData = createAsyncThunk(
  'data/fetchLocationsData',
  async () => await fetchLocations()
);

type InitialStateType = {
  facilities: {
    data: Facility[];
    status: 'idle' | 'failed' | 'loading' | 'succeeded';
    error: string | undefined;
  };
  locations: {
    data: Location[];
    status: 'idle' | 'failed' | 'loading' | 'succeeded';
    error: string | undefined;
  };
};

const initialState: InitialStateType = {
  facilities: { data: [], status: 'idle', error: '' },
  locations: { data: [], status: 'idle', error: '' },
};

const dataSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    updateFacility: (state, action) => {
      const facility = action.payload;

      state.facilities.data = state.facilities.data.map((f) =>
        f.id === facility.id ? facility : f
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilitiesData.pending, (state) => {
        state.facilities.status = 'loading';
      })
      .addCase(fetchFacilitiesData.fulfilled, (state, action) => {
        state.facilities.status = 'succeeded';
        state.facilities.data = action.payload;
      })
      .addCase(fetchFacilitiesData.rejected, (state, action) => {
        state.facilities.status = 'failed';
        state.facilities.error = action.error.message;
      })
      .addCase(fetchLocationsData.pending, (state) => {
        state.locations.status = 'loading';
      })
      .addCase(fetchLocationsData.fulfilled, (state, action) => {
        state.locations.status = 'succeeded';
        state.locations.data = action.payload;
      })
      .addCase(fetchLocationsData.rejected, (state, action) => {
        state.locations.status = 'failed';
        state.locations.error = action.error.message;
      });
  },
});

export const { updateFacility } = dataSlice.actions;

export const databaseReducer = dataSlice.reducer;
