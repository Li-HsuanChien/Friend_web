import React, { useContext } from 'react';
import { AppContext } from '../../../../../AppContext';

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
