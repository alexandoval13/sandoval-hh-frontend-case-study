import type { Route } from './+types/home';
import { useLocation } from 'react-router';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '~/redux/store';
import { updateFacility } from '~/redux/dataSlice';

import { System, systemDefinition } from 'db/facilities';

import type { Facility } from '~/types/facility';
import MoreIcon from '~/assets/icons/moreIcon';
import Dropdown from '~/components/Dropdown';
import PageTitle from '~/components/PageTitle';
import WeatherCard from '~/components/Weather';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Facility Page' },
    { name: 'description', content: 'Details for facility' },
  ];
}

/** Facility Details and Location Overview */
export default function Facility() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [targetTempDropdownOpen, setTargetTempDropdownOpen] =
    useState<boolean>(false);

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const facilityData = useSelector((state: RootState) => {
    return state.facilityWeather.data.find((f) => f.id == id);
  });

  if (!facilityData) {
    return <PageTitle title="Facility Data Unavailable" />;
  }

  const { weather, name, currentTemp, targetTemp } = facilityData;

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

  const handleClickTemp = () => {
    setTargetTempDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    setTargetTempDropdownOpen(false);
  };

  const handleSelectTemp = (value: string | number) => {
    dispatch(updateFacility({ ...facilityData, targetTemp: value }));
  };

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <PageTitle title={name} />
      </div>

      <div className="flex flex-col w-full py-2 gap-1 border-b-1">
        <div className="flex justify-between items-center">
          <h4>Facility Temperature</h4>
          {currentTemp ? (
            <h4>{`${currentTemp}${
              systemDefinition[System.FARENHEIT].label
            }`}</h4>
          ) : (
            <h4 className="text-sm italic">Unavailable</h4>
          )}
        </div>

        <div className="flex justify-between items-center relative">
          <h6 className="text-sm italic">Setting:</h6>
          <button
            onClick={handleClickTemp}
            className="shadow-md px-3 py-1 bg-[#F3F3F3] rounded-sm"
          >
            <h6 className="text-sm">
              {targetTemp}
              {systemDefinition[System.FARENHEIT].label}
            </h6>
            <div className="border border-gray-300" />
          </button>
          {targetTempDropdownOpen && (
            <Dropdown
              values={dropdownValues()}
              currentValue={targetTemp}
              close
              handleClose={handleCloseDropdown}
              handleSelect={handleSelectTemp}
            />
          )}
        </div>
      </div>

      {weather && (
        <WeatherCard
          city={facilityData.location?.city}
          state={facilityData.location?.state}
          weather={weather}
        />
      )}
    </div>
  );
}
