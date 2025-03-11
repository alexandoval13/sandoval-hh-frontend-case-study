import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '~/redux/store';
import { addNewFacility, addNewLocation } from '~/redux/dataSlice';
import { System, systemDefinition } from 'db/facilities';
import type { Facility } from '~/types/facility';
import { useNavigate } from 'react-router';
import { AddFacilitySchema } from './AddFacilityFormSchema';

type FormValues = {
  name: string;
  targetTemp: string;
  city: string;
  state: string;
  lat: string;
  lon: string;
};

type AddFacilityFormType = {
  handleClose?: () => void;
};

const AddFacilityForm = ({ handleClose }: AddFacilityFormType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(
    (state: RootState) => state.databaseData.locations.data
  );

  const initialValues: FormValues = {
    name: 'Bend Nursery',
    targetTemp: '65',
    city: 'Bend',
    state: 'OR',
    lat: '44.0582',
    lon: '-121.3153',
  };

  const handleOnSubmit = (values: FormValues, { resetForm }: any) => {
    let location = locations.find(
      (loc) =>
        loc.lat &&
        loc.lon &&
        loc.lat === Number(values.lat) &&
        loc.lon === Number(values.lon)
    );

    if (!location) {
      location = {
        id: Math.floor(Math.random() * 100),
        city: values.city,
        state: values.state.toUpperCase(),
        lat: Number(values.lat),
        lon: Number(values.lon),
        weather: null,
      };
      dispatch(addNewLocation(location));
    } else {
      console.log('Matched to existing location!:\n', location);
    }

    let newFacility: Facility = {
      id: Math.random() * 100,
      locationId: location.id,
      targetTemp: Number(values.targetTemp),
      system: System.FARENHEIT,
      name: values.name,
      currentTemp: null,
    };

    dispatch(addNewFacility(newFacility));

    resetForm();

    navigate(`/facility?id=${newFacility.id}`);

    if (handleClose) handleClose();
  };

  const inputStyles =
    'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all italic';

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddFacilitySchema}
      onSubmit={(values, { resetForm }) =>
        handleOnSubmit(values, { resetForm })
      }
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
            className="bg-gray-500 text-white px-4 py-2 rounded float-end"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddFacilityForm;
