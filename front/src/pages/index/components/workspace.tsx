import React, { useState, MouseEvent } from 'react';
import './workspace.css'

interface WorkspaceConf {
	movementX: number;
	movementY: number;
}

const Workspace: React.FC = () => {
	const [workspaceConf, setWorkspaceConf] = useState<WorkspaceConf>({
		movementX: 0,
		movementY: 0
	});

	const handleMouseDown = (e: any) => {
		if (e.target !== document.getElementById('workspaceContainer')) return;

		const move = (moveEvent: any) => {
			setWorkspaceConf(workspaceConf => ({
				movementX: workspaceConf.movementX + moveEvent.movementX,
				movementY: workspaceConf.movementY + moveEvent.movementY
			}));
		};

		const handleMouseUp = () => {
			document.body.removeEventListener('mousemove', move);
		};

		document.body.addEventListener('mousemove', move);
		document.body.addEventListener('mouseup', handleMouseUp, { once: true });
	};

	return (
		<div id="workspaceContainer" onMouseDown={handleMouseDown} style={{height: '100vh'}}>
			<main
				id="workspace"
				style={{ transform: `translate(${workspaceConf.movementX}px, ${workspaceConf.movementY}px)` }}>

				<div className="block">
					<div className="header">Sample</div>
					<div className="content">Yes</div>
				</div>

			</main>
		</div>
	);
};

export default Workspace;
