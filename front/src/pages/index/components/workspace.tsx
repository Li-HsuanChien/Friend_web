import React, { useState, useEffect, useRef  } from 'react';
import './workspace.css'

const Workspace = () => {

  const workspaceRef = useRef<HTMLDivElement>(null);
  const workspaceContainerRef = useRef<HTMLDivElement>(null);
  
  const [workspaceConfState, setWorkspaceConfState] = useState({
    movementX: 0,
    movementY: 0,
  });


  useEffect(() =>{
    if(workspaceRef.current !== null ){
      workspaceRef.current.style["translate"] = `${workspaceConfState.movementX}px ${workspaceConfState.movementY}px`;
    } 
  },[workspaceConfState])

  //const workspace = document.getElementById('workspace')!

  if(workspaceContainerRef.current){
    workspaceContainerRef.current.addEventListener("mousedown", (e: any) =>{
      if(e.target !== workspaceContainerRef.current) return;
      
      const move = (event:any) => {
        setWorkspaceConfState((prevConf) => ({
          ...prevConf,
          movementX: prevConf.movementX + event.movementX,
          movementY: prevConf.movementY + event.movementY,
        }));
      };
  
      document.body.addEventListener('mousemove', move);
      document.body.addEventListener(
        "mouseup",
        e => document.body.removeEventListener("mousemove", move), { once: true }
      );
      
    })
  }
  
  
  // const workspaceRef = useRef<HTMLDivElement>(null);
  // const workspaceContainerRef = useRef<HTMLDivElement>(null);

  // // while the conf change, modify workspace accordingly
  // const workspaceConf = new Proxy({ movementX: 0, movementY: 0, scale: 1 }, {
  //   set: (target, key, value) => {
  //     target[key as keyof typeof target]  = value;
  //     if (["movementX", "movementY"].includes(key as string) ) { // i.e., if movement changed
  //       if(workspaceRef.current){
  //         workspaceRef.current.style["translate"] = `${target.movementX}px ${target.movementY}px`;
  //       }
  //     }

  //     return true; // set handler should return true if success.
  //   }
  // });

  // // init workspace
  // Object.keys(workspaceConf).forEach((key) => {
  //   workspaceConf[key as keyof typeof workspaceConf] = workspaceConf[key as keyof typeof workspaceConf];
  // });

  // // move the workspace while mouse dragging
  // if(workspaceContainerRef.current){
  //   workspaceContainerRef.current.addEventListener("mousedown", e => {
  //   if (e.target !== workspaceContainerRef.current) return;
  //   // prevent unexpected workspace movement (e.g. while blocks being dragged)

  //   const move = (e:any) => { // mousemove event
  //     workspaceConf.movementX += e.movementX;
  //     workspaceConf.movementY += e.movementY;
  //   }

  //   document.body.addEventListener("mousemove", move);
  //   document.body.addEventListener(
  //     "mouseup",
  //     e => document.body.removeEventListener("mousemove", move), { once: true }
  //   );
  //   });}

  

  return (
    <div
    id="workspaceContainer"
      ref={workspaceContainerRef}
      style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}
    >
      <main
        id="workspace"
        ref={workspaceRef}
      >
        <div className="block">
          <div className="header">Sample</div>
          <div className="content">Yes</div>
        </div>
      </main>
    </div>
  );
};

export default Workspace;
