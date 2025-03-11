import React, { useEffect, useRef, useState } from 'react';
import Search from './Search';
import Dropdown from '~/components/Dropdown';

type ListViewProps = {
  children: React.ReactNode[];
  sortValue?: any;
  sortOptions?: any;
  search?: boolean;
  filter?: boolean;
  group?: boolean;
  searchValue: string;
  handleSearch: (val: string) => void;
  handleClear: () => void;
  handleClickSortOption: (value: any) => void;
};

const ListView = ({
  children,
  filter = false,
  sortValue,
  sortOptions,
  search = false,
  searchValue,
  handleSearch,
  handleClear,
  handleClickSortOption,
}: ListViewProps) => {
  const sortRef = useRef<HTMLDivElement>(null);

  const [sortOptionsOpen, setSortOptionsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOptionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleClickSort = () => {
    setSortOptionsOpen(true);
  };

  const handleCloseSortOptions = () => {
    setSortOptionsOpen(false);
  };

  const handleSelectSort = (value: string | number) => {
    handleClickSortOption(value);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        {search && (
          <Search
            value={searchValue}
            handleChange={handleSearchChange}
            handleClear={handleClear}
            enableIcon
            placeholder="facility name, city, state abbr..."
            enableClear={searchValue?.length > 0}
          />
        )}

        {sortValue !== undefined && (
          <div ref={sortRef} className="relative inline-block">
            {sortOptionsOpen && (
              <Dropdown
                values={sortOptions}
                currentValue={sortValue}
                handleClose={handleCloseSortOptions}
                handleSelect={(value) => handleSelectSort(value)}
              />
            )}
            <button
              className="flex flex-row shadow-md px-3 py-1 bg-[#F3F3F3] rounded-sm"
              onClick={handleClickSort}
            >
              <h4 className="text-sm italic">{`Sort: ${sortOptions[sortValue].label}`}</h4>
            </button>
          </div>
        )}

        {filter && <button>Filter</button>}
      </div>

      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};

export default ListView;
