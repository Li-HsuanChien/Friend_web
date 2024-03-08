import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../AppContext';


const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  width: 20vw;
  height: 95vh;
  right: 3vw;
  top: 2vh;
}
`
const ConnectionMenu = () =>{
  const { clickedconnection } = useContext(AppContext);

  return(
    <>
      <MenuStyle>
        <h1>{clickedconnection?.id}</h1>
      </MenuStyle>

    </>
  )
}


export default ConnectionMenu;
