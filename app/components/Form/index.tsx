import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '~/redux/store';
import { addNewFacility, addNewLocation } from '~/redux/dataSlice';
import { System, systemDefinition } from 'db/facilities';
import type { Location } from '~/types/location';
import type { Facility } from '~/types/facility';

const AddFacilitySchema = Yup.object().shape({
  name: Yup.string().required('Facility name is required'),
  targetTemp: Yup.number()
    .min(45, 'Target temperature must be at least 45')
    .max(100, 'Target temperature must be at most 100')
    .required('Target temperature is required'),
  city: Yup.string().required(
    'City is required when latitude and longitude are not provided'
  ),
  lat: Yup.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  lon: Yup.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});

type FormValues = {
  name: string;
  targetTemp: string;
  city: string;
  state: string;
  lat: string;
  lon: string;
};

const AddFacilityForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(
    (state: RootState) => state.databaseData.locations.data
  );

  const initialValues: FormValues = {
    name: 'test',
    targetTemp: '65',
    city: 'bend',
    state: 'or',
    lat: '',
    lon: '',
  };

  const handleOnSubmit = (values: FormValues) => {
    let location: Location = locations.find(
      (loc) => loc.lat === Number(values.lat) && loc.lon === Number(values.lon)
    ) || {
      id: Math.floor(Math.random() * 100),
      city: values.city,
      state: values.state.toUpperCase(),
      lat: Number(values.lat),
      lon: Number(values.lon),
      weather: null,
    };
    dispatch(addNewLocation(location));

    let newFacility: Facility = {
      id: Math.random() * 100,
      locationId: location.id,
      targetTemp: Number(values.targetTemp),
      system: System.FARENHEIT,
      name: values.name,
      currentTemp: null,
    };

    dispatch(addNewFacility(newFacility));
  };

  const inputStyles =
    'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all italic';

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddFacilitySchema}
      onSubmit={(values, { setSubmitting }) => handleOnSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Facility Name
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Pescadero Greenhouse"
              className={inputStyles}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Target Temperature
            </label>

            <Field
              type="number"
              name="targetTemp"
              placeholder={`65 ${systemDefinition[System.FARENHEIT].label}`}
              className={inputStyles}
            />
            <ErrorMessage
              name="targetTemp"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <Field
              type="text"
              name="city"
              placeholder="Pescadero"
              className={inputStyles}
            />
            <ErrorMessage
              name="city"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <Field
              type="text"
              name="state"
              placeholder="CA"
              className={inputStyles}
            />
            <ErrorMessage
              name="state"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <Field
              type="text"
              name="lat"
              placeholder=""
              className={inputStyles}
            />
            <ErrorMessage
              name="lat"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <Field
              type="text"
              name="lon"
              placeholder=""
              className={inputStyles}
            />
            <ErrorMessage
              name="lon"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddFacilityForm;
