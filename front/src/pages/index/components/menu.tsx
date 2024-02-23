import React from 'react';
import { IconContext } from 'react-icons';
import { TbMenu2 } from 'react-icons/tb';

const Menu = () => {
  return (
    <>
        <IconContext.Provider
        value={{ color: 'white', size: '50px' }}
      >
        <TbMenu2 />
      </IconContext.Provider>
    </>
  );
};

export default Menu;
