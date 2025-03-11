import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import FacilityCard from '~/components/Dashboard/FacilityCard';
import ListView from '~/components/Dashboard/ListView';

import { type RootState } from '~/redux/store';
import { type FacilityLocation } from '~/types/facility';
import useDebounce from '~/hooks/useDebounce';
import PageTitle from '../PageTitle';
import {
  sortFacilities,
  SortOptions,
  SortOptionsDefinitions,
} from '~/redux/formattedFacilityWeatherSlice';

export default function Dashboard() {
  const dispatch = useDispatch();

  const facilitiesWithWeather = useSelector(
    (state: RootState) => state.facilityWeather.data ?? []
  );
  const sortType = useSelector(
    (state: RootState) => state.facilityWeather.sort ?? []
  );
  const sortedFacilities = useSelector(
    (state: RootState) => state.facilityWeather.sortedData ?? []
  );

  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredFacilitiesWithWeather, setFilteredFacilitiesWithWeather] =
    useState<FacilityLocation[]>([]);

  const debouncedSearch = useDebounce(searchValue, 300);
  useEffect(() => {
    const activeList =
      sortType !== SortOptions.DEFAULT
        ? sortedFacilities
        : facilitiesWithWeather;
    if (debouncedSearch) {
      setFilteredFacilitiesWithWeather(
        activeList.filter(
          (facility) =>
            facility.name
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase()) ||
            facility.location?.city
              ?.toLowerCase()
              .includes(debouncedSearch.toLowerCase()) ||
            facility.location?.state
              ?.toLowerCase()
              .includes(debouncedSearch.toLowerCase())
        )
      );
    } else {
      setFilteredFacilitiesWithWeather(activeList);
    }
  }, [debouncedSearch, facilitiesWithWeather]);

  const handleClear = () => {
    setSearchValue('');
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSort = (value: SortOptions) => {
    dispatch(sortFacilities(value));
  };

  const list = useMemo(() => {
    return searchValue ? filteredFacilitiesWithWeather : facilitiesWithWeather;
  }, [
    sortType,
    sortedFacilities,
    searchValue,
    filteredFacilitiesWithWeather,
    facilitiesWithWeather,
  ]);

  return (
    <>
      <PageTitle title={'Dashboard'} />
      <ListView
        search
        sortValue={sortType}
        sortOptions={SortOptionsDefinitions}
        handleClear={handleClear}
        handleSearch={handleSearch}
        searchValue={searchValue}
        handleClickSortOption={handleSort}
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
    </>
  );
}
