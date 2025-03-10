import type { Route } from './+types/home';
import { Hippo } from '../hippo/hippo';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '~/redux/store';
import { fetchFacilitiesData, fetchLocationsData } from '~/redux/dataSlice';
import { useEffect } from 'react';
import { fetchWeatherData } from '~/redux/weatherSlice';
import { processFacilities } from '~/redux/formattedFacilityWeatherSlice';
import Dashboard from './dashboard';
import AutoRefetch from '~/components/AutoRefetch';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const locations = useSelector(
    (state: RootState) => state.databaseData.locations.data
  );
  const facilities = useSelector(
    (state: RootState) => state.databaseData.facilities.data
  );
  const weather = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchLocationsData());
    dispatch(fetchFacilitiesData());
  }, [dispatch]);

  useEffect(() => {
    if (locations.length) {
      dispatch(fetchWeatherData());
    }
  }, [locations, dispatch]);

  useEffect(() => {
    if (
      weather.status === 'succeeded' &&
      facilities.length &&
      locations.length
    ) {
      dispatch(
        processFacilities({
          facilities: facilities,
          locations: locations,
          weather,
        })
      );
    }
  }, [locations, facilities, weather.status, dispatch]);

  return (
    <>
      <AutoRefetch />
      <Dashboard />
    </>
  );
}
