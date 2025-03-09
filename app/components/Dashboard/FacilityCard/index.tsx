import { System, systemDefinition } from 'db/facilities';
import { useState } from 'react';
import type { FacilityLocation } from '~/types/facility';

type FacilityCardProps = {
  facility: FacilityLocation;
};

const FacilityCard = ({ facility }: FacilityCardProps) => {
  /** TODO
   * conditional background colors
   * conditional system indicator
   */
  const [system, setSystem] = useState<System>(System.FARENHEIT);

  return (
    <div className="flex flex-col gap-2 w-full p-[6px] bg-[#F3F3F3]">
      <div className="flex flex-row items-center">
        <div className="basis-3/4 text-[20px]">{facility.name}</div>
        <div className="basis-1/4 flex flex-row items-center text-right">
          <div className="basis-1/2 text-[24px]">{`${facility.currentTemp}${systemDefinition[system].label}`}</div>
          <div className=" basis-1/2 text-sm">{`${facility.targetTemp}${systemDefinition[system].label}`}</div>
        </div>
      </div>

      {facility.location ? (
        <div className="flex flex-row items-center">
          <div className="basis-3/4 text-sm italic">
            {facility.location.city}
          </div>
          <div className="basis-1/4 text-sm text-end">
            {facility.weather?.main.temp}
            {systemDefinition[system].label}
          </div>
        </div>
      ) : (
        <div className="text-sm italic">{'loading...'}</div>
      )}
    </div>
  );
};

export default FacilityCard;
