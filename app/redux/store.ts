import { configureStore } from '@reduxjs/toolkit';
import { databaseReducer } from './dataSlice';
import { facilityWeatherReducer } from './formattedFacilityWeatherSlice';
import { weatherReducer } from './weatherSlice';

export const store = configureStore({
  reducer: {
    databaseData: databaseReducer,
    weather: weatherReducer,
    facilityWeather: facilityWeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
