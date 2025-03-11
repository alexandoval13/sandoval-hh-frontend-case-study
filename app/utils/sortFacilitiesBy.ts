import { SortOptions } from '~/redux/formattedFacilityWeatherSlice';
import type { FacilityLocation } from '~/types/facility';

type SortFacilitiesByProps = {
  facilities: FacilityLocation[];
  sort: SortOptions;
};

export const sortFacilitiesBy = ({
  facilities,
  sort,
}: SortFacilitiesByProps) => {
  switch (sort) {
    case SortOptions.NAME:
      return facilities.sort((a, b) => a.name.localeCompare(b.name));
    case SortOptions.CITY:
      return facilities.sort((a, b) =>
        (a.location?.city || '').localeCompare(b.location?.city || '')
      );
    case SortOptions.STATE:
      return facilities.sort((a, b) =>
        (a.location?.state || '').localeCompare(b.location?.state || '')
      );
    default:
      return facilities;
  }
};
