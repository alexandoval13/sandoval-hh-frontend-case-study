import { fetchWeather } from 'api/weatherAPI';
import { useState, useEffect } from 'react';
import type { Place } from '~/types/place';

type UseWeatherProps = {
  currentPlaces: Array<Place>;
};

export const useWeatherData = ({ currentPlaces }: UseWeatherProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Place[] | null>(null);

  useEffect(() => {
    const fetchAllWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const updatedPlaces = await Promise.all(
          currentPlaces.map(async (place) => {
            const weather = await fetchWeather(place.lat, place.lon);
            return { ...place, weather };
          })
        );
        setData(updatedPlaces);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (currentPlaces.length > 0) fetchAllWeather();
  }, [currentPlaces]);

  return { loading, error, data };
};
