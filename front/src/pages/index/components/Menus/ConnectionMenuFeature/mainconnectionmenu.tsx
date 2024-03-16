import React, { useState } from 'react';
import DefaultConnectionMenu from './defaultnodemenu';
import EditConnectionMenu from './editconnectionmenu';


const MainConnectionMenu = () =>{

  const [editState, setEditState] = useState<boolean>(false);

  return(
    <>
      {editState ? <EditConnectionMenu setEditState={setEditState} editState={editState}/>: <DefaultConnectionMenu/>}
      {editState ? '': <button onClick={()=>{
        setEditState(!editState);
        console.log(editState)}}>edit</button> }
    </>
  )
}


export default MainConnectionMenu;
