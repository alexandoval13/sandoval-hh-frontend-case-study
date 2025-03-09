import type { System } from 'db/facilities';
import type { Place } from './place';

export interface Facility {
  id: string | number;
  name: string;
  currentTemp: number;
  targetTemp: number;
  system: System;
  placeId: string | number;
}

export interface FacilityLocation extends Facility {
  place: Place | null;
}
