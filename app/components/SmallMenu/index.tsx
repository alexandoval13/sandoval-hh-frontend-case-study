import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import CloseIcon from '~/assets/icons/closeIcon';
import { MenuActions } from '~/types/menu';

type SmallMenuProps = {
  list: {
    value: string;
    type: MenuActions;
    path?: string;
    onClick?: () => void;
  }[];

  handleClose: () => void;
};

const SmallMenu = (props: SmallMenuProps) => {
  const { list, handleClose } = props;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  const handleClick = (cb?: () => void) => {
    if (cb) cb();
    handleClose();
  };

  return (
    <div className="flex flex-col gap-2" ref={menuRef}>
      <div className="flex flex-row w-full justify-end items-center">
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
      <ol>
        {list.map((item, i) => {
          if (item.type === MenuActions.LINK && item.path) {
            return (
              <div key={`smallmenu::list::link::${item.value}::${i}`}>
                <Link to={item.path} onClick={() => handleClose()}>
                  <h6>{item.value}</h6>
                </Link>
              </div>
            );
          } else if (item.type === MenuActions.CALLBACK) {
            return (
              <div key={`smallmenu::list::button::${item.value}::${i}`}>
                <button onClick={() => handleClick(item.onClick)}>
                  <h6>{item.value}</h6>
                </button>
              </div>
            );
          }
        })}
      </ol>
    </div>
  );
};

export default SmallMenu;
