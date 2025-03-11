import { useState } from 'react';
import { Link } from 'react-router';
import HamburgerIcon from '~/assets/icons/hamburgerIcon';
import HomeIcon from '~/assets/icons/homeIcon';
import SmallMenu from '../SmallMenu';
import { MenuActions } from '~/types/menu';

const Footer = () => {
  const [menuOptionsOpen, setMenuOptionsOpen] = useState<boolean>(false);

  const handleClickHamburgerMenu = () => {
    setMenuOptionsOpen(true);
  };

  const handleCloseHamburgerMenu = () => {
    setMenuOptionsOpen(false);
  };

  const list = [
    {
      value: 'Add New Facility',
      type: MenuActions.LINK,
      path: `/newFacility`,
    },
  ];

  return (
    <div className="sticky z-50 bottom-0">
      {menuOptionsOpen && (
        <div
          className={`absolute bottom-full right-0 bg-white w-max px-4 py-2 rounded shadow-md border border-gray-200 z-50`}
        >
          <SmallMenu list={list} handleClose={handleCloseHamburgerMenu} />
        </div>
      )}
      <footer className="sticky z-50 bg-white p-4 bottom-0 border-gray-600">
        <div className="flex w-full justify-around">
          <Link to={'/'}>
            <HomeIcon />
          </Link>
          <button onClick={handleClickHamburgerMenu}>
            <HamburgerIcon />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
