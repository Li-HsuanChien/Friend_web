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
          <UserNode user_id = {current_user_id as number} current = {true}></UserNode>
        </main>
      </div>
    </Wrapper>
  );
};

export default Workspace;
