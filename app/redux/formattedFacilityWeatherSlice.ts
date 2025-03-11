import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from './store';
import type { Facility, FacilityLocation } from '~/types/facility';
import type { Location } from '~/types/location';
import { sortFacilitiesBy } from '~/utils/sortFacilitiesBy';

export enum SortOptions {
  DEFAULT,
  NAME,
  CITY,
  STATE,
}

export const SortOptionsDefinitions = [
  { label: 'Default', value: SortOptions.DEFAULT },
  { label: 'Name', value: SortOptions.NAME },
  { label: 'City', value: SortOptions.CITY },
  { label: 'State', value: SortOptions.STATE },
];

export enum GroupOptions {
  DEFAULT,
  CITY,
  STATE,
  FACILITY_TEMPERATURE,
  LOCAL_TEMPERATURE,
}

type InitialStateType = {
  data: FacilityLocation[];
  filteredData: FacilityLocation[];
  sortedData: FacilityLocation[];
  sort: SortOptions;
  group: GroupOptions;
};

const initialState: InitialStateType = {
  data: [],
  filteredData: [],
  sortedData: [],
  sort: SortOptions.DEFAULT,
  group: GroupOptions.DEFAULT,
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

      const data = facilities.map((facility: Facility) => ({
        ...facility,
        location: locations[locationMap.get(facility.locationId)] || null,
        weather: weather.data[facility.locationId] || null,
      }));

      state.data =
        state.sort !== SortOptions.DEFAULT
          ? sortFacilitiesBy({ facilities: data, sort: state.sort })
          : data;
    },
    sortFacilities: (state, action) => {
      if (action.payload !== state.sort) {
        state.sort = action.payload;
        state.data = sortFacilitiesBy({
          facilities: [...state.data],
          sort: action.payload,
        });
      }
    },
  },
});

export const { processFacilities, sortFacilities } =
  facilityWeatherSlice.actions;
export const facilityWeatherReducer = facilityWeatherSlice.reducer;
export const selectFacilityWeather = (state: RootState) =>
  state.facilityWeather.data;
