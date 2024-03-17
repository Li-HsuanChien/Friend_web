import React, { useState } from 'react';
import DefaultNodeMenu from './defaultnodemenu';
import EditNodeMenu from './editnodemenu';
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

const MainNodeMenu = () =>{

  const [editState, setEditState] = useState<boolean>(false);

  if(editState){
    return(<><EditNodeMenu setEditState={setEditState} editState={editState}/></>)
  } else {
    return(
      <MenuStyle>
        <DefaultNodeMenu/>
        <button onClick={()=>{setEditState(!editState);}}>edit</button>
      </MenuStyle>
    )
  }
}

export default MainNodeMenu;


