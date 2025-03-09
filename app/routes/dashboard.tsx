import type { Route } from './+types/home';
import { useEffect, useMemo, useState } from 'react';

import { places } from 'db/places';
import { facilities } from 'db/facilities';

import { useWeatherData } from '~/hooks/useWeatherData';

import type { Place } from '~/types/place';
import type { Facility, FacilityLocation } from '~/types/facility';

import FacilityCard from '~/components/Dashboard/FacilityCard';
import ListView from '~/components/Dashboard/ListView';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard Page' },
    { name: 'description', content: 'Facility weather overview' },
  ];
}

export default function Dashboard() {
  const [currentPlaces, setCurrentPlaces] = useState<Place[]>(places); // TODO: places
  const [currentFacilities, setCurrentFacilities] =
    useState<Facility[]>(facilities);

  const [facilityLocations, setFacilityLocations] = useState<
    FacilityLocation[]
  >([]);
  const [filteredList, setFilteredList] = useState<FacilityLocation[] | null>(
    null
  );

  const [searchValue, setSearchValue] = useState<string>('');

  const {
    loading,
    error,
    data: updatedPlaces,
  } = useWeatherData({
    currentPlaces,
  });

  useMemo(() => {
    // TODO: may not need to transform all data into state at this level, but pass into child components on iteration
    let placeMap = new Map();
    updatedPlaces?.forEach((place, i) => placeMap.set(place.id, i));

    let updatedFacilityLoations = currentFacilities.map((facility) => ({
      ...facility,
      place: updatedPlaces?.[placeMap.get(facility.placeId)] || null,
    }));

    setFacilityLocations(updatedFacilityLoations);
  }, [updatedPlaces, currentFacilities]);

  useMemo(() => {
    // todo: optimize search
    if (searchValue) {
      let list = facilityLocations.filter(
        (facility) =>
          facility.name.toLowerCase().includes(searchValue) ||
          facility.place?.city.toLowerCase().includes(searchValue)
      );
      setFilteredList(list);
    }
  }, [searchValue, facilityLocations]);

  const handleClear = () => {
    setSearchValue('');
    setFilteredList(null);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value.toLowerCase());
  };

  return (
    <div>
      <ListView
        title={'Facilities'}
        search
        handleClear={handleClear}
        handleSearch={handleSearch}
        searchValue={searchValue}
      >
        {(filteredList || facilityLocations).map((location) => {
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
