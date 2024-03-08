import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../AppContext';


const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 3vw;
  top: 2vh;
}
`
const NodeMenu = () =>{
  const { clickeduser } = useContext(AppContext);

  return(
    <>
      <MenuStyle>
        <h1>{clickeduser?.username}</h1>
      </MenuStyle>

    </>
  )
}


export default NodeMenu;
