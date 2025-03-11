import { System, systemDefinition } from 'db/facilities';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import Dropdown from '~/components/Dropdown';
import { updateFacility } from '~/redux/dataSlice';
import { type AppDispatch } from '~/redux/store';
import type { FacilityLocation } from '~/types/facility';

type FacilityCardProps = {
  facility: FacilityLocation;
};

const FacilityCard = ({ facility }: FacilityCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [targetTempDropdownOpen, setTargetTempDropdownOpen] =
    useState<boolean>(false);

  const {
    name = 'Unknown Facility',
    targetTemp = '--',
    currentTemp = '--',
    location,
    weather,
  } = facility ?? {};

  const dropdownValues = () => {
    const numbers = [];
    for (let i = 100; i >= 45; i--) {
      numbers.push({
        value: i,
        label: `${i} ${systemDefinition[System.FARENHEIT].label}`,
      });
    }
    return numbers;
  };

  const handleSelectNewValue = (value: string | number) => {
    dispatch(updateFacility({ ...facility, targetTemp: value }));
    setTargetTempDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full p-3 bg-gray-100">
      {location ? (
        <div className="flex justify-between text-sm italic">
          <h4>{`${location.city}, ${location.state}`}</h4>
          <h4>
            {weather?.main.temp}
            {systemDefinition[System.FARENHEIT].label}
          </h4>
        </div>
      ) : (
        <div className="text-sm italic">Loading...</div>
      )}

      <div className="flex justify-between items-center">
        <Link
          to={`/facility?id=${facility.id}`}
          className="text-lg font-medium"
        >
          {name}
        </Link>

        <div className="flex items-center gap-4">
          {currentTemp ? (
            <h1 className="text-lg">{`${currentTemp}${
              systemDefinition[System.FARENHEIT].label
            }`}</h1>
          ) : (
            <h4 className="text-xs italic">Unavailable</h4>
          )}

          <div className="relative">
            <button
              className="shadow-md px-3 py-1 bg-white rounded-sm text-sm"
              onClick={() => setTargetTempDropdownOpen(true)}
            >
              {`${targetTemp}${systemDefinition[System.FARENHEIT].label}`}
            </button>

            {targetTempDropdownOpen && (
              <Dropdown
                values={dropdownValues()}
                currentValue={targetTemp}
                handleClose={() => setTargetTempDropdownOpen(false)}
                handleSelect={handleSelectNewValue}
                close
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
