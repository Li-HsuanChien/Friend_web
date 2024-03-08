import React from 'react';
import styled from 'styled-components';

const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  width: 20vw;
  height: 95vh;
  right: 3vw;
  top: 2vh;
}
`
const MainMenu = () =>{


  return(
    <>
      <MenuStyle>
        <h1>Main</h1>
      </MenuStyle>

    </>
  )
}


export default MainMenu;
