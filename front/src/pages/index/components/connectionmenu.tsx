import React, { useContext, useState } from 'react';
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
  div{
    height: 20%;
    background-color: white;
  }
  p{
    background-color: white;
  }
`

const ConnectionMenu = () =>{
  const { clickedconnection, current_user_id } = useContext(AppContext);
  const [editState, setEditState] = useState<boolean>(false);

  return(
    <>
      <MenuStyle>
        <p>@{clickedconnection?.id}</p>
        <span>closeness:</span>
        <p>{clickedconnection?.closeness}</p>
        <span>nicknamechildtoparent: </span>
        <p>{clickedconnection?.nicknamechildtoparent}</p>
        <span>nicknameparenttochild: </span>
        <p>{clickedconnection?.nicknameparenttochild}</p>
        {clickedconnection?.inviter===current_user_id || clickedconnection?.invitee===current_user_id
          ? <button onClick={()=>setEditState(!editState)}>edit</button>
          : ''}
      </MenuStyle>

    </>
  )
}


export default ConnectionMenu;
