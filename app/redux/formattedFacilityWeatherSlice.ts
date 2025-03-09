import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from './store';
import type { Facility, FacilityLocation } from '~/types/facility';
import type { Location } from '~/types/location';

type InitialStateType = {
  data: FacilityLocation[];
  filteredData: FacilityLocation[];
  searchActive: boolean;
};

const initialState: InitialStateType = {
  data: [],
  filteredData: [],
  searchActive: false,
};

const facilityWeatherSlice = createSlice({
  name: 'facilityWeather',
  initialState,
  reducers: {
    processFacilities: (state, action) => {
      const { facilities, locations, weather } = action.payload;

      let locationMap = new Map();
      locations.forEach((location: Location, i: string) =>
        locationMap.set(location.id, i)
      );

      const formattedData = facilities.map((facility: Facility) => {
        return {
          ...facility,
          location: locations[locationMap.get(facility.locationId)] || null,
          weather: weather.data[facility.locationId] || null,
        };
      });

      state.data = formattedData;
    },
  },
});

export const { processFacilities } = facilityWeatherSlice.actions;
export const facilityWeatherReducer = facilityWeatherSlice.reducer;
export const selectFacilityWeather = (state: RootState) =>
  state.facilityWeather.data;
