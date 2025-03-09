import { locations } from 'db/locations';
import { facilities } from 'db/facilities';

export const fetchLocations = async () => {
  const data = locations; // mocking a fetch here
  return data;
};

export const fetchFacilities = async () => {
  const data = facilities; // mocking a fetch here
  return data;
};
