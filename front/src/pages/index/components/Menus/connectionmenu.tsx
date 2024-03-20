import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../../AppContext';
import { useUser } from '../../../../lib/hooks/useUser';
import MainConnectionMenu from './ConnectionMenuFeature/mainconnectionmenu';
import DefaultConnectionMenu from './ConnectionMenuFeature/defaultnodemenu';

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

const ConnectionMenu= () =>{
  const user = useUser();
  const current_user_id = user ? user.user_id: null;
  const { clickedconnection } = useContext(AppContext);

  return(
    <>
      <MenuStyle>
        {clickedconnection?.inviter===current_user_id || clickedconnection?.invitee===current_user_id
          ? <MainConnectionMenu/>
          : <DefaultConnectionMenu/>}
      </MenuStyle>

    </>
  )
}
export default ConnectionMenu;
