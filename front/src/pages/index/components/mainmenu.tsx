import React from 'react';
import styled from 'styled-components';

const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
  display: flex;
  gap: 1%;
  flex-direction: column;
  align-items: center;
`
const ItemStyle = styled.div`
  background-color: white;
  width: 96%;
  height: 3%;
  margin-top: 5%;
  align-items: center;
  text-align: center;
  border-radius: 5%;
`;

const MainMenu = () =>{


  return(
    <>
      <MenuStyle>
        <ItemStyle>
          Connect
        </ItemStyle>
        <ItemStyle>
          Feature
        </ItemStyle>
        <ItemStyle>
          Feature
        </ItemStyle>
        <ItemStyle>
          Feature
        </ItemStyle>
        <ItemStyle>
          Feature
        </ItemStyle>
        <ItemStyle>
          Feature
        </ItemStyle>
        <ItemStyle>
          Feature
        </ItemStyle>
        <ItemStyle>
          Feature
        </ItemStyle>
        <ItemStyle>
          Share Website!
        </ItemStyle>
      </MenuStyle>

    </>
  )
}


export default MainMenu;
