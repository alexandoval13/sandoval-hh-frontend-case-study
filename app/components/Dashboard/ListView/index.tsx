import React, { useEffect, useState } from 'react';
import Search from './Search';

type ListViewProps = {
  children: React.ReactNode[];
  sort?: boolean;
  filter?: boolean;
  search?: boolean;
  title?: string;
  handleSearch: (val: string) => void;
  handleClear: () => void;
  searchValue: string;
};

const ListView = ({
  children,
  filter = false,
  sort = false,
  search = false,
  title,
  handleSearch,
  handleClear,
  searchValue,
}: ListViewProps) => {
  const [listData, setListData] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setListData(children);
  }, [children]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div>
      <div>{title}</div>
      <div className="flex flex-row">
        {search && (
          <Search
            value={searchValue}
            handleChange={handleSearchChange}
            handleClear={handleClear}
            enableIcon
            placeholder="facility, city, state abbr..."
            enableClear={searchValue?.length > 0}
          />
        )}

        {sort && <button>Sort</button>}
        {filter && <button>Filter</button>}
      </div>
      <div className="flex flex-col gap-1">{listData}</div>
    </div>
  );
};

export default ListView;
