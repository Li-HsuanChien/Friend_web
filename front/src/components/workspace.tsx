import React, { useState, useEffect, useRef } from 'react';
import { CiUser } from "react-icons/ci";

interface WorkspaceConfig {
  movementX: number;
  movementY: number;
  scale: number;
  showingX: number;
  showingY: number;
}


const Workspace = () => {
    const [workspaceConf, setWorkspaceConf] = useState<WorkspaceConfig>({
    movementX: 0,
    movementY: 0,
    scale: 1,
    showingX: 0,
    showingY: 0,
    });

    const workspaceRef = useRef<HTMLDivElement>(null);
    const [mousePosInWsC, setMousePosInWsC] = useState<[number, number]>([0, 0]);

    useEffect(() => {
    // Initialize config
    setWorkspaceConf((prevConf) => ({
        ...prevConf,
        movementX: prevConf.movementX,
        movementY: prevConf.movementY,
        scale: prevConf.scale,
        showingX: prevConf.showingX,
        showingY: prevConf.showingY,
    }));
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== workspaceRef.current) return;

    const move = (e: MouseEvent) => {
        // mousemove event
        setWorkspaceConf((prevConf) => ({
        ...prevConf,
        movementX: prevConf.movementX + e.movementX,
        movementY: prevConf.movementY + e.movementY,
        }));
    };

    document.body.addEventListener('mousemove', move);
    document.body.addEventListener(
        'mouseup',
        (e) => document.body.removeEventListener('mousemove', move),
        { once: true }
    );
    };

    const handleMouseMove = (e: React.MouseEvent) => {
    if (workspaceRef.current) {
        const wsCBox = workspaceRef.current.getBoundingClientRect();
        setMousePosInWsC([e.clientX - wsCBox.x, e.clientY - wsCBox.y]);
    }
    };

    const handleWheel = (e: React.WheelEvent) => {
    const oldScale = workspaceConf.scale;

    setWorkspaceConf((prevConf) => ({
        ...prevConf,
        scale: Math.max(0.05, prevConf.scale * 3 ** (e.deltaY * -0.001)),
    }));

    const newScale = workspaceConf.scale;

    const vec = [
        mousePosInWsC[0] - workspaceConf.movementX,
        mousePosInWsC[1] - workspaceConf.movementY,
    ];

    const vecScale = 1 - newScale / oldScale;

    setWorkspaceConf((prevConf) => ({
        ...prevConf,
        movementX: prevConf.movementX + vec[0] * vecScale,
        movementY: prevConf.movementY + vec[1] * vecScale,
    }));
    };


    return (
        <div
            id="workspaceContainer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
            ref={workspaceRef}
        >
            <CiUser />
        </div>
    );
};

export default Workspace;
