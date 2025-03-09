import type { CurrentWeather } from '~/types/weather';

export const fetchWeather = async (
  lat: number,
  lon: number
): Promise<CurrentWeather> => {
  const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json();
};
