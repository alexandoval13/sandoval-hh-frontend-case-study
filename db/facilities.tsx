import type { Facility } from '~/types/facility';

export enum System {
  FARENHEIT,
  CELSIUS,
}

export const systemDefinition = [{ label: '°F' }, { label: '°C' }];

export const facilities: Array<Facility> = [
  {
    id: 1,
    name: 'Pescadero Greenhouse 1',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    locationId: 1,
  },
  {
    id: 11,
    name: 'Pescadero Greenhouse 2',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    locationId: 1,
  },
  {
    id: 12,
    name: 'Tabernacle Greenhouse',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    locationId: 2,
  },
  {
    id: 13,
    name: 'Petaluma Greenhouse',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    locationId: 3,
  },
  {
    id: 15,
    name: 'Sunnyslope Greenhouse',
    currentTemp: 67,
    targetTemp: 62.5,
    system: System.FARENHEIT,
    locationId: 4,
  },
];
