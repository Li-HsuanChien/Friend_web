import React, { useState } from 'react';
import DefaultNodeMenu from './defaultnodemenu';
import EditNodeMenu from './editnodemenu';


const MainNodeMenu: React.FC = () =>{

  const [editState, setEditState] = useState<boolean>(false);

  return(
    <>
      {editState ? <EditNodeMenu/>: <DefaultNodeMenu/>}
      <button onClick={()=>setEditState(!editState)}>{editState? 'edit': 'save'}</button>
    </>
  )
}

export default MainNodeMenu;
