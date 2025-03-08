import { type CurrentWeather } from './weather';

export interface Place {
  id: string | number;
  city: string;
  lat: number;
  lon: number;
  weather: CurrentWeather | null;
}
