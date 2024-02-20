import React, { useState, MouseEvent } from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  #workspaceContainer {
    flex: 1;
    overflow: hidden;
  }

  #workspace {
    width: 0;
    height: 0;
    overflow: visible;
  }

  .block {
    position: absolute;
    background-color: #f1f1f1;
    border: solid 2px #d3d3d3;
    min-width: 16ch;
    width: fit-content;
    height: fit-content;
  }

  .block > .header {
    padding: 0.5em;
    cursor: move;
    background-color: #2196f3;
  }

  .block > .content {
    background-color: #222;
    text-align: left;
  }
`;

interface WorkspaceConf {
  movementX: number;
  movementY: number;
}

const Workspace: React.FC = () => {
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
          <div className='block'>
            <div className='header'>Sample</div>
            <div className='content'>Yes</div>
          </div>
        </main>
      </div>
    </Wrapper>
  );
};

export default Workspace;
