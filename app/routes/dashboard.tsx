import { useDispatch, useSelector } from 'react-redux';
import type { Route } from './+types/home';
import { useEffect, useState } from 'react';
import FacilityCard from '~/components/Dashboard/FacilityCard';
import ListView from '~/components/Dashboard/ListView';

import { type RootState } from '~/redux/store';
import { type FacilityLocation } from '~/types/facility';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard Page' },
    { name: 'description', content: 'Facility weather overview' },
  ];
}

export default function Dashboard() {
  const facilitiesWithWeather = useSelector(
    (state: RootState) => state.facilityWeather.data
  );

  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredFacilitiesWithWeather, setFilteredFacilitiesWithWeather] =
    useState<FacilityLocation[]>([]);

  useEffect(() => {
    const results = facilitiesWithWeather.filter(
      (facility) =>
        facility.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        facility.location?.city
          ?.toLowerCase()
          .includes(searchValue.toLowerCase())
    );
    setFilteredFacilitiesWithWeather(results);
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue('');
  };

  const handleSearch = (value: string) => {
    setSearchValue(value.toLowerCase());
  };

  const list = searchValue
    ? filteredFacilitiesWithWeather
    : facilitiesWithWeather;

  console.log({ filteredFacilitiesWithWeather, facilitiesWithWeather });
  return (
    <div>
      <ListView
        title={'Facilities'}
        search
        handleClear={handleClear}
        handleSearch={handleSearch}
        searchValue={searchValue}
      >
        {list.map((location) => {
          return (
            <FacilityCard
              key={`facility-card::${location.id}`}
              facility={location}
            />
          );
        })}
      </ListView>
    </div>
  );
}
