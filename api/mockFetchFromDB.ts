import { locations } from 'db/locations';
import { facilities } from 'db/facilities';

// mocking db queries  here
export const fetchLocations = async () => {
  const data = locations;
  return data;
};

export const fetchFacilities = async () => {
  const data = facilities;
  return data;
};
