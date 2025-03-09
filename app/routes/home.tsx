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
    (state: RootState) => state.databaseData.locations
  );
  const facilities = useSelector(
    (state: RootState) => state.databaseData.facilities
  );
  const weather = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchLocationsData());
    dispatch(fetchFacilitiesData());
  }, [dispatch]);

  useEffect(() => {
    if (locations.status === 'succeeded') {
      dispatch(fetchWeatherData());
    }
  }, [locations, dispatch]);

  useEffect(() => {
    if (weather.status === 'succeeded') {
      dispatch(
        processFacilities({
          facilities: facilities.data,
          locations: locations.data,
          weather,
        })
      );
    }
  }, [weather, dispatch]);

  // useEffect(() => {
  //   const worker = new Worker(new URL('../refreshWorker.js', import.meta.url));

  //   worker.onmessage = (event) => {
  //     dispatch(fetchWeatherData());
  //   };

  //   worker.onerror = (error) => {
  //     console.error('Worker error:', error);
  //   };

  //   return () => {
  //     worker.terminate(); // Clean up the worker on component unmount
  //   };
  // }, []);

  return (
    <>
      <AutoRefetch />
      <Dashboard />
    </>
  );
}
