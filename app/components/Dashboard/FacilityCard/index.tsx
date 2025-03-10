import { System, systemDefinition } from 'db/facilities';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from '~/components/Dropdown';
import { updateFacility } from '~/redux/dataSlice';
import { type AppDispatch } from '~/redux/store';
import type { FacilityLocation } from '~/types/facility';

type FacilityCardProps = {
  facility: FacilityLocation;
};

const FacilityCard = ({ facility }: FacilityCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  /** TODO
   * conditional background colors
   * conditional system indicator
   */
  const [targetTempDropdownOpen, setTargetTempDropdownOpen] =
    useState<boolean>(false);
  const [system, setSystem] = useState<System>(System.FARENHEIT);
  const { name, targetTemp, currentTemp, location, weather } = facility;

  const handleClickTargetTemp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setTargetTempDropdownOpen(true);
  };

  const handleCloseTargetTempDropdown = () => {
    setTargetTempDropdownOpen(false);
  };

  const dropdownValues = () => {
    const numbers = [];
    for (let i = 100; i >= 45; i--) {
      numbers.push({
        value: i,
        label: `${i} ${systemDefinition[system].label}`,
      });
    }
    return numbers;
  };

  const handleSelectNewValue = (value: string | number) => {
    dispatch(updateFacility({ ...facility, targetTemp: value }));
  };

  return (
    <div className="flex flex-col gap-2 w-full p-[6px] bg-[#F3F3F3]">
      <div className="flex flex-row items-center">
        <h1 className="basis-5/8 text-[18px]">{name}</h1>
        <div className="basis-3/8 flex flex-row items-center">
          <h1 className="basis-1/2 text-[20px] text-right">{`${currentTemp}${systemDefinition[system].label}`}</h1>
          <div className="relative inline-block basis-1/2">
            <button
              className="w-full"
              onClick={(e) => handleClickTargetTemp(e)}
            >
              <h6 className="text-sm underline text-right">{`${targetTemp} ${systemDefinition[system].label}`}</h6>
            </button>
            {targetTempDropdownOpen && (
              <div
                className={
                  ' absolute top-full mt-1 right-0 bg-white w-max px-3 py-2 rounded shadow-md max-h-40 overflow-y-auto border border-gray-200 z-50'
                }
              >
                <Dropdown
                  values={dropdownValues()}
                  currentValue={targetTemp}
                  handleClose={handleCloseTargetTempDropdown}
                  handleSelect={handleSelectNewValue}
                  close
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {location ? (
        <div className="flex flex-row items-center">
          <h4 className="basis-3/4 text-sm italic">{location.city}</h4>
          <h4 className="basis-1/4 text-sm text-end">
            {weather?.main.temp}
            {systemDefinition[system].label}
          </h4>
        </div>
      ) : (
        <div className="text-sm italic">{'loading...'}</div>
      )}
    </div>
  );
};

export default FacilityCard;
