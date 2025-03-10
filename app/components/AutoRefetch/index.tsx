import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '~/redux/store';
import { updateWeatherData } from '~/redux/weatherSlice';

const AutoRefetch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(
    (state: RootState) => state.databaseData.locations.data
  );

  useEffect(() => {
    if (window.Worker) {
      const worker = new Worker(
        new URL('../../refreshWeatherWorker.js', import.meta.url)
      );

      worker.postMessage({
        interval: 500000,
        locations,
        apiKey: import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY,
      }); // Refresh every 5 min

      worker.onmessage = (e) => {
        if (e.data.type === 'weatherData') {
          dispatch(updateWeatherData(e.data.payload));
        } else if (e.data.type === 'error') {
          console.error('Weather fetch error:', e.data.payload);
        }
      };

      return () => worker.terminate();
    }
  }, [dispatch, locations]);

  return null; // This component runs in the background
};

export default AutoRefetch;
