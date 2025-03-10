import type { System } from 'db/facilities';
import type { Location } from './location';
import type { CurrentWeather } from './weather';

export interface Facility {
  id: string | number;
  name: string;
  currentTemp: number | null;
  targetTemp: number;
  system: System;
  locationId: string | number;
}

export interface FacilityLocation extends Facility {
  location: Location | null;
  weather: CurrentWeather;
}
