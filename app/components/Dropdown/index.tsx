import React, { useEffect, useRef } from 'react';
import CloseIcon from '~/assets/icons/closeIcon';

type DropdownProps = {
  handleClose: () => void;
  close: boolean;
  values: {
    label: string;
    value: number | string;
  }[];
  currentValue: number | string;
  handleSelect: (value: number | string) => void;
};

const Dropdown = ({
  values,
  currentValue,
  close,
  handleClose,
  handleSelect,
}: DropdownProps) => {
  if (!values.length) return;

  const selectedRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [values]);

  const handleClickListItem = (value: string | number) => {
    handleSelect(value);
    handleClose();
  };

  return (
    <div className="overflow-hidden scroll-y">
      <div className="flex justify-end border-b border-gray-200 absolute right-0">
        {close && (
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        )}
      </div>
      <div className="max-h-36 overflow-y-auto">
        <ol className="py-2">
          {values.map((value, i) => (
            <li
              key={`dropdown::li::${value}::${i}`}
              ref={value.value === currentValue ? selectedRef : null}
              className={`px-4 py-2 cursor-pointer transition ${
                value.value === currentValue
                  ? 'bg-gray-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleClickListItem(value.value)}
            >
              {value.label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Dropdown;
