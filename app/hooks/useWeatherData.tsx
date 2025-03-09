import { fetchWeather } from 'api/fetchWeather';
import { useState, useEffect } from 'react';
import type { Location } from '~/types/location';

type UseWeatherProps = {
  currentLocations: Array<Location>;
};

export const useWeatherData = ({ currentLocations }: UseWeatherProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Location[] | null>(null);

  useEffect(() => {
    const fetchAllWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const updatedLocations = await Promise.all(
          currentLocations.map(async (place) => {
            const weather = await fetchWeather(place.lat, place.lon);
            return { ...place, weather };
          })
        );
        setData(updatedLocations);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (currentLocations.length > 0) fetchAllWeather();
  }, [currentLocations]);

  return { loading, error, data };
};
