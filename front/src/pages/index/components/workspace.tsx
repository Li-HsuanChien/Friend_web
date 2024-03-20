import React, { useState, useContext, useEffect } from 'react';
import { styled } from 'styled-components';
import { AppContext } from '../../../AppContext';
import UserNode from './node';
import { vwToPx, vhToPx } from '../../../lib/px_V_UnitConversion';
import { closeMenu, addShowedUser } from '../../../actions';
import { useUser } from '../../../lib/hooks/useUser';

const Wrapper = styled.div`
  #workspaceContainer {
    flex: 1;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #workspace {
    width: 0;
    height: 0;
    overflow: visible;
  }

  button{
    position:absolute;
    width: 40px;
    height: 20px;
    bottom: 20px;
    left: 30px;
  }
`;

interface WorkspaceConf {
  movementX: number;
  movementY: number;
}
const Workspace: React.FC = () => {
  const user = useUser();
  const current_user_id = user ? user.user_id: null;
  const { dispatch, workspacepos } = useContext(AppContext);
  const [workspaceConf, setWorkspaceConf] = useState<WorkspaceConf>({
    movementX: 0,
    movementY: 0,
  });

  const handleMouseDown = (e: any) => {
    if (e.target !== document.getElementById('workspaceContainer')) return;

    const move = (moveEvent: any) => {
      setWorkspaceConf((workspaceConf) => ({
        movementX: workspaceConf.movementX + moveEvent.movementX,
        movementY: workspaceConf.movementY + moveEvent.movementY,
      }));
    };

    const handleMouseUp = () => {
      document.body.removeEventListener('mousemove', move);
    };

    document.body.addEventListener('mousemove', move);
    document.body.addEventListener('mouseup', handleMouseUp, { once: true });
  };

  useEffect(() => {
    dispatch(addShowedUser(current_user_id as string));
  },[])

  useEffect(()=>{
    const movementX = vwToPx(50 - (workspacepos?.posx as number))
    const movementY = vhToPx(50 - (workspacepos?.posy as number))
    setWorkspaceConf({
      movementX: movementX,
      movementY: movementY,
    })
  }, [workspacepos])

  const returnPos = () =>{
    setWorkspaceConf({
      movementX: 0,
      movementY: 0,
    })
  }
  const handleClick = () =>{
    dispatch(closeMenu());
  }

  return (
    <Wrapper>
      <div
        id='workspaceContainer'
        onMouseDown={handleMouseDown}
        onDoubleClick={handleClick}
        style={{ height: '100vh' }}
      >
        <main
          id='workspace'
          style={{
            transform: `translate(${workspaceConf.movementX}px, ${workspaceConf.movementY}px)`,
          }}
        >
          <UserNode
            user_id = {current_user_id as string}
            posData={{posx: 50, posy:50, angle:((5 * Math.PI)/4)}}
            connectionState = {true}
            nodesize={80}
            ></UserNode>
        </main>
        <button onClick={returnPos}>Back</button>
      </div>
    </Wrapper>
  );
};

export default Workspace;
