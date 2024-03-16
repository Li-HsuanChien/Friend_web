import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../../../AppContext';
import { useUser } from '../../../../../lib/hooks/useUser';


const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
  div{
    height: 20%;
    background-color: white;
  }
  p{
    background-color: white;
  }
`

const DefaultConnectionMenu = () =>{

  const { clickedconnection } = useContext(AppContext);

  return(
    <>
        <p>@{clickedconnection?.id}</p>
        <span>closeness:</span>
        <p>{clickedconnection?.closeness}</p>
        <span>nicknamechildtoparent: </span>
        <p>{clickedconnection?.nicknamechildtoparent}</p>
        <span>nicknameparenttochild: </span>
        <p>{clickedconnection?.nicknameparenttochild}</p>
    </>
  )
}


export default DefaultConnectionMenu;
