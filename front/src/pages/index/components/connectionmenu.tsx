import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../AppContext';


const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
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
