import { useSelector } from 'react-redux';
import type { Route } from './+types/home';
import { useEffect, useMemo, useState } from 'react';
import FacilityCard from '~/components/Dashboard/FacilityCard';
import ListView from '~/components/Dashboard/ListView';

import { type RootState } from '~/redux/store';
import { type FacilityLocation } from '~/types/facility';
import useDebounce from '~/hooks/useDebounce';
import AddFacilityForm from '~/components/Form';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard Page' },
    { name: 'description', content: 'Facility weather overview' },
  ];
}

export default function Dashboard() {
  const facilitiesWithWeather = useSelector(
    (state: RootState) => state.facilityWeather.data ?? []
  );

  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredFacilitiesWithWeather, setFilteredFacilitiesWithWeather] =
    useState<FacilityLocation[]>([]);

  const debouncedSearch = useDebounce(searchValue, 300);
  useEffect(() => {
    if (debouncedSearch) {
      setFilteredFacilitiesWithWeather(
        facilitiesWithWeather.filter(
          (facility) =>
            facility.name
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase()) ||
            facility.location?.city
              ?.toLowerCase()
              .includes(debouncedSearch.toLowerCase())
        )
      );
    } else {
      setFilteredFacilitiesWithWeather(facilitiesWithWeather);
    }
  }, [debouncedSearch, facilitiesWithWeather]);

  const handleClear = () => {
    setSearchValue('');
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const list = useMemo(() => {
    return searchValue ? filteredFacilitiesWithWeather : facilitiesWithWeather;
  }, [searchValue, filteredFacilitiesWithWeather, facilitiesWithWeather]);

  return (
    <div>
      <AddFacilityForm />
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
