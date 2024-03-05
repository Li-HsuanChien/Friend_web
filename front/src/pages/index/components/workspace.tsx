import React, { useState, useContext } from 'react';
import { styled } from 'styled-components';
import { AppContext } from '../../../AppContext';
import UserNode from './node';

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
  const { current_user_id } = useContext(AppContext);
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
  const returnPos = () =>{
    setWorkspaceConf({
      movementX: 0,
      movementY: 0,
    })
  }

  const nodeSize = 80
  const nodeSizeInVw = (nodeSize / window.innerWidth) * 100;
  const nodeSizeMidPointInVw = nodeSizeInVw/2;
  const mainNodepos = {
    posx: 50-nodeSizeMidPointInVw,
    posy: 50-nodeSizeMidPointInVw
  }

  return (
    <Wrapper>
      <div
        id='workspaceContainer'
        onMouseDown={handleMouseDown}
        style={{ height: '100vh' }}
      >
        <main
          id='workspace'
          style={{
            transform: `translate(${workspaceConf.movementX}px, ${workspaceConf.movementY}px)`,
          }}
        >
          {/* childrens */}
          <UserNode user_id = {current_user_id as number} posData={mainNodepos} connectionState = {true} nodeSize={nodeSize}></UserNode>
        </main>
        <button onClick={returnPos}>Back</button>
      </div>
    </Wrapper>
  );
};

export default Workspace;
