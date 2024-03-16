import React, { useState } from 'react';
import DefaultNodeMenu from './defaultnodemenu';
import EditNodeMenu from './editnodemenu';


const MainNodeMenu = () =>{

  const [editState, setEditState] = useState<boolean>(false);

  return(
    <>
      {editState ? <EditNodeMenu setEditState={setEditState} editState={editState}/>: <DefaultNodeMenu/>}
      {editState ? '': <button onClick={()=>{setEditState(!editState);}}>edit</button> }
    </>
  )
}

export default MainNodeMenu;
