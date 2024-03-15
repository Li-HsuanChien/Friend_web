import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../../AppContext';
import DefaultNodeMenu from './NodeMenuComponents/defaultnodemenu';
import MainNodeMenu from './NodeMenuComponents/mainnodemenu';

const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
  img{
    width: 100%;
    max-height: 30%;
    height: auto;
    object-fit: contain;
    }
  div{
    height: 20%;
    background-color: white;
  }
  p{
    background-color: white;
  }
  a{
    color: black;
  }
`
const NodeMenu = () =>{
  const { clickeduser, current_user_id } = useContext(AppContext);

  return(
      <MenuStyle>

        {clickeduser?.username_id===current_user_id
            ? <MainNodeMenu/>
            : <DefaultNodeMenu/>}
      </MenuStyle>
  )
}


export default NodeMenu;
