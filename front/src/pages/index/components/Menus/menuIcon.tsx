import React, { useContext } from 'react';
import { IconContext } from 'react-icons';
import { TbMenu2 } from 'react-icons/tb';
import { AppContext } from '../../../../AppContext';
import { openMenu } from '../../../../actions';


const MenuIcon = () => {
  const {dispatch} = useContext(AppContext)

  const handleClick = () => {
    dispatch(openMenu());
  }

  return (
    <div onClick={handleClick}>
        <IconContext.Provider
        value={{ color: 'white', size: '50px' }}
      >
        <TbMenu2 />
      </IconContext.Provider>
    </div>
  );
};

export default MenuIcon;
