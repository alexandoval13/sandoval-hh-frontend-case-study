import type { Facility } from '~/types/facility';

export enum System {
  FARENHEIT,
  CELSIUS,
}

export const facilities: Array<Facility> = [
  {
    id: 1,
    name: 'Pescadero Greenhouse 1',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    placeId: 1,
  },
  {
    id: 11,
    name: 'Pescadero Greenhouse 2',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    placeId: 1,
  },
  {
    id: 12,
    name: 'Tabernacle Greenhouse',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    placeId: 2,
  },
  {
    id: 13,
    name: 'Petaluma Greenhouse',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    placeId: 3,
  },
  {
    id: 15,
    name: 'Sunnyslope Greenhouse',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    placeId: 4,
  },
];
