import type { CurrentWeather } from '~/types/weather';

type FetchWeatherInput = {
  lat?: number;
  lon?: number;
  city?: string;
  state?: string;
};

export const fetchWeather = async ({
  lat,
  lon,
  city,
  state,
}: FetchWeatherInput): Promise<CurrentWeather> => {
  const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY;
  const url =
    lat && lon
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      : `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&appid=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json();
};
