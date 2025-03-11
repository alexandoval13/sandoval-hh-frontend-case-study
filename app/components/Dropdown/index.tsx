import { useEffect, useRef } from 'react';
import CloseIcon from '~/assets/icons/closeIcon';

type DropdownProps = {
  handleClose: () => void;
  close?: boolean;
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
  close = false,
  handleClose,
  handleSelect,
}: DropdownProps) => {
  if (!values.length) return null;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        block: 'center',
      });
    }
  }, [values]);

  const handleClickListItem = (value: string | number) => {
    handleSelect(value);
    handleClose();
  };

  return (
    <div
      className="absolute top-full mt-1 right-0 bg-white px-3 py-2 rounded shadow-md max-h-40 min-w-32  border border-gray-200 z-50"
      ref={dropdownRef}
    >
      {/* Close Button */}
      {close && (
        <button onClick={handleClose} className="absolute top-2 right-2 p-1">
          <CloseIcon />
        </button>
      )}

      {/* Dropdown List */}
      <div className="max-h-36 overflow-y-auto">
        <ol>
          {values.map((value, i) => (
            <li
              key={`dropdown::li::${value}::${i}`}
              ref={value.value === currentValue ? selectedRef : null}
              className={`px-4 py-2 cursor-pointer transition-all ${
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
