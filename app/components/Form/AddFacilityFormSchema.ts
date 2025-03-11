import * as Yup from 'yup';

export const AddFacilitySchema = Yup.object().shape({
  name: Yup.string().required('Facility name is required'),
  targetTemp: Yup.number()
    .min(45, 'Target temperature must be at least 45')
    .max(100, 'Target temperature must be at most 100')
    .required('Target temperature is required'),
  city: Yup.string().required('City is required'),
  lat: Yup.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  lon: Yup.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});
