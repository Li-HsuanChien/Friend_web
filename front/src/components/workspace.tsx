import React from 'react';

const Workspace = (): any =>{

    const qry = (...query: string[]): HTMLElement | null => document.querySelector(...query);
    const qrys = (...query: string[]): NodeList => document.querySelectorAll(...query);

    const workspace = qry("#workspace");

    interface WorkspaceConfig {
        movementX: number;
        movementY: number;
        scale: number;
        showingX?: number;
        showingY?: number;
    }

    const workspaceConf: WorkspaceConfig = new Proxy(
    { movementX: 0, movementY: 0, scale: 1 } as WorkspaceConfig,
    {
        set: (target, key, value) => {
        target[key as keyof WorkspaceConfig] = value;

        if (key === "scale") {
            // apply scale
            (workspace as HTMLElement).style.transform = `scale(${target.scale})`;
        }

        if (["showingX", "showingY"].includes(key as string)) {
            // calc the actual movement
            target.movementX = -target.showingX! * target.scale;
            target.movementY = -target.showingY! * target.scale;
        }

        if (["movementX", "movementY", "scale"].includes(key as string)) {
            // recalc the showing point
            target.showingX = -target.movementX / target.scale;
            target.showingY = -target.movementY / target.scale;
        }

        if (["movementX", "movementY", "showingX", "showingY"].includes(key as string)) {
            // i.e., if movement changed
            (workspace as HTMLElement).style.transform = `translate(${target.movementX}px, ${target.movementY}px)`;
            // note: the "translate"d amounts seem not to be affected by "scale"
        }

        return true; // set handler should return true if success.
        },
    }
    );

    for (let key in workspaceConf) {
        if (workspaceConf.hasOwnProperty(key)) {
            workspaceConf[key as keyof WorkspaceConfig] = workspaceConf[key as keyof WorkspaceConfig];
        }
    }

    // move the workspace while mouse dragging
    qry("#workspaceContainer")?.addEventListener("mousedown", (e: MouseEvent) => {
        if ((e.target as Element) !== qry("#workspaceContainer")) return;
        // prevent unexpected workspace movement (e.g., while blocks being dragged)

        const move = (e: MouseEvent) => {
            // mousemove event
            workspaceConf.movementX += e.movementX;
            workspaceConf.movementY += e.movementY;
        };

        document.body.addEventListener("mousemove", move);
        document.body.addEventListener(
            "mouseup",
            (e: MouseEvent) =>
            document.body.removeEventListener("mousemove", move),
            { once: true }
        );
    });

    // scale the workspace while scrolling
    {
        let mousePosInWsC: [number, number] = [0, 0]; // mouse's position in workspace container
        qry("#workspaceContainer")?.addEventListener("mousemove", (e: MouseEvent) => {
            const wsCBox = (workspace as HTMLElement).getBoundingClientRect();
            mousePosInWsC = [e.x - wsCBox.x, e.y - wsCBox.y];
            // we can't just set that to [e.layerX, e.layerY] 'cuz
            // the "layer" may be any block the cursor's hovering on
    });

    qry("#workspaceContainer")?.addEventListener(
        "wheel",
        (e: WheelEvent) => {
        const oldScale = workspaceConf.scale;

        workspaceConf.scale *= 3 ** (e.deltaY * -0.001);
        const newScale = (workspaceConf.scale = Math.max(0.05, workspaceConf.scale));

        // use mouse's pos as the scaling center
        const vec = [
            mousePosInWsC[0] - workspaceConf.movementX,
            mousePosInWsC[1] - workspaceConf.movementY,
        ];

        const vecScale = 1 - newScale / oldScale;
        workspaceConf.movementX += vec[0] * vecScale;
        workspaceConf.movementY += vec[1] * vecScale;
        },
        { passive: true }
    );
    }
    interface blockdetails{
        header: string,
        content: string,
        position: number[] | undefined[]
    }
    
    
    function createBlock({
        header,
        content,
        position: [x = workspaceConf.showingX, y = workspaceConf.showingY] = []
    }: blockdetails) {
        // todo: change this element to import and export to json files
        let block = document.createElement("div");
        block.classList.add("block");
        //<div class="content"><pre id = "json">${content || ""}</pre></div> to format json
        block.innerHTML = `
            <div class="inputPorts"></div>
            <div class="header">${header || ""}</div>
            <div class="content">${content || ""}</div>
            <div class="outputPorts"></div>
        `;
    
        block.style["left"] = `${x}px`;
        block.style["top"] = `${y}px`;
    
        block.children[1].addEventListener("mousedown", (e) => {
            const move = (e:any) => { // mousemove
                x += e.movementX / workspaceConf.scale;
                y += e.movementY / workspaceConf.scale;
                block.style["left"] = `${x}px`;
                block.style["top"] = `${y}px`;
    
                block.dispatchEvent(new CustomEvent("redrawLines"));
            }
    
            document.body.addEventListener("mousemove", move);
            document.body.addEventListener(
                "mouseup",
                e => document.body.removeEventListener("mousemove", move), { once: true }
            );
        });
    
        return block;
    }
    
    // create block 
    qry("#addBlock").addEventListener("click", e => {
        //get according blockType using html <select> scroller
        qry("#workspace").appendChild(createBlock({ header, content }));
    });
    
    // create a Input block
    qry("#workspace").appendChild(createBlock({ header: "Input" }));

    
    return(
        <>
            <div id="workspaceContainer">
                <main id="workspace">
                </main>
            </div>

        </>    
    )
    
}

export default Workspace