import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import UserNode from './node';
import { AppContext } from '../../../AppContext';
import { clickedConnection } from '../../../actions';
import { ConnectionData, Pos } from '../../../lib/Types';

const LineBox = styled.svg<{ fullposdata?: fullPosdata }>`
  position: fixed;
  ${props => props.fullposdata ? `top: ${props.fullposdata.top}vh` : '0'};
  ${props => props.fullposdata ? `left: ${props.fullposdata.left}vw` : '0'};
  ${props => props.fullposdata ? `width: ${props.fullposdata.width}vw` : '0'};
  ${props => props.fullposdata ? `height: ${props.fullposdata.height}vh` : '0'};
  z-index: -1;

  line{ 
    stroke: white;
    stroke-width: 3px;
    
  }
  line:hover {
    stroke: white;
    stroke-width: 6px; 
  }
`
interface LinePos extends Pos{
  angle: number,
}
interface fullPosdata{
  top: number,
  left: number,
  height: number,
  width:  number
}
interface parent{
  id: string,
  username: string
}
interface Props {
  data: ConnectionData;
  parent: parent,
  nodesize: number,
  startposdata: Pos;
  endposdata: LinePos;
}
interface LineData{
  x1: number,
  x2: number,
  y1: number,
  y2: number,
}

const MainConnection: React.FC<Props> = (props) => {
  const {
    id,
    date_established,
    closeness,
    nicknamechildtoparent,
    nicknameparenttochild,
    inviter,
    invitee
  } = props.data;
  const parent_id = props.parent.id;
  const parent_username = props.parent.username;
  const inviterIsParent = inviter === parent_id;
  const child_id = inviterIsParent? invitee: inviter;
  const { dispatch } = useContext(AppContext)
  const [childNodeSize, setChildNodeSize] = useState<number>(80);
  const [childName, setchildName] = useState<string>('');
  // known start and finish
  const [lineData, setLineData] = useState<LineData>({
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  })
  const [fullPosdata, SetFullPosData] = useState<fullPosdata>({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  })
  useEffect(() => {
    const nodesize = props.nodesize;
    if(closeness === 'friend'){
      setChildNodeSize(nodesize - 15);
    } else if(closeness === 'closefriend'){
      setChildNodeSize(nodesize - 10);
    } else{
      setChildNodeSize(nodesize - 5);
    }
    const startPosx = props.startposdata.posx;
    const startPosy = props.startposdata.posy;
    const endPosx = props.endposdata.posx;
    const endPosy = props.endposdata.posy;
    //console.log(`line ${id} sx ${startPosx} sy${startPosy} ex${endPosx} ey${endPosy} `)
    SetFullPosData({
      top: Math.min(startPosy, endPosy),
      left: Math.min(startPosx, endPosx),
      height: Math.abs(startPosy - endPosy),
      width:  Math.abs(startPosx - endPosx),
    })
    if((endPosy < startPosy && endPosx > startPosx) || (endPosy > startPosy && endPosx < startPosx)){
      setLineData({
                  x1: 0,
                  y1 : 100,
                  x2 : 100,
                  y2 : 0
                })
    } else {
      setLineData({
        x1: 0,
        y1 : 0,
        x2 : 100,
        y2 : 100
      })
    }
  }, [window.innerHeight, window.innerWidth, props])
  const handleLineCLick = (e: any) =>{
    e.stopPropagation();
  }
  const handledbLineCLick = (e:any) =>{
    e.stopPropagation();
    dispatch(clickedConnection(props.data));
  }


  return (
    <>
      <LineBox
        fullposdata={fullPosdata}
        height={fullPosdata.height}
        width={fullPosdata.width}
        id={`connection ${id}`}
        onClick={handleLineCLick}>
        <g onMouseOver={(e) => e.stopPropagation()}>
          <line
            className="hover-effect"
            x1={`${lineData.x1}%`}
            y1={`${lineData.y1}%`}
            x2={`${lineData.x2}%`}
            y2={`${lineData.y2}%`}
            onClick={handleLineCLick}
            onDoubleClick={handledbLineCLick}
          />
          <title>{`Connection ID: ${id}\nDate Established: ${date_established}\nCloseness: ${closeness}\n`}
                  {nicknameparenttochild && `${childName}'s Nick Name to ${parent_username}is ${nicknameparenttochild}\n`}
                  {nicknamechildtoparent && `${parent_username}'s Nick Name to ${childName} is ${nicknamechildtoparent}\n`}</title>
        </g>
      </LineBox>
      <UserNode user_id = {child_id}
                posData={props.endposdata}
                connectionState = {false}
                nodesize={childNodeSize}
                parent_id={parent_id}
                setchildName={setchildName}
                ></UserNode>
    </>
  );
};

export default MainConnection;
