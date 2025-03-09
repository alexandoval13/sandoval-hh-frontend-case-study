import { type CurrentWeather } from './weather';

export interface Location {
  id: string | number;
  city: string;
  lat: number;
  lon: number;
  weather: CurrentWeather | null;
}
