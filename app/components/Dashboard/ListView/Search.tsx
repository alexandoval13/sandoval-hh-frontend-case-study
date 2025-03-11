import React from 'react';
import SearchIcon from '~/assets/icons/searchIcon';

type SearchProps = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  enableClear: boolean;
  enableIcon?: boolean;
  placeholder?: string;
};

const Search = ({
  value,
  handleChange,
  handleClear,
  enableIcon = true,
  placeholder = '',
  enableClear,
}: SearchProps) => {
  const dispatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const dispatchClear = () => {
    handleClear();
  };

  return (
    <div className="flex flex-row items-center gap-1">
      {enableIcon && <SearchIcon />}
      <input
        placeholder={placeholder}
        onChange={(e) => dispatchChange(e)}
        value={value}
      />

      {enableClear && <button onClick={dispatchClear}>Clear</button>}
    </div>
  );
};

export default Search;
