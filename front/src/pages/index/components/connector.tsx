import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import UserNode from './node';
import { AppContext } from '../../../AppContext';
import { clickedConnection } from '../../../actions';

const LineBox = styled.svg<{ fullPosdata?: fullPosdata }>`
  position: fixed;
  ${props => props.fullPosdata ? `top: ${props.fullPosdata.top}vh` : '0'};
  ${props => props.fullPosdata ? `left: ${props.fullPosdata.left}vw` : '0'};
  ${props => props.fullPosdata ? `width: ${props.fullPosdata.width}vw` : '0'};
  ${props => props.fullPosdata ? `height: ${props.fullPosdata.height}vh` : '0'};
  .hover-effect:hover {
    stroke: green; /* Change stroke color to green on hover */
  }
`
interface ConnectionProps {
  id: number;
  date_established: string;
  closeness: string;
  nicknamechildtoparent?: string;
  nicknameparenttochild?: string;
  inviter: number;
  invitee: number;
}
interface Posdata {
  posx: number;
  posy: number;
}
interface LinePos extends Posdata{
  angle: number,
}

interface fullPosdata{
  top: number,
  left: number,
  height: number,
  width:  number
}
interface Props {
  data: ConnectionProps;
  parent_id: number,
  nodeSize: number,
  startposdata: Posdata;
  endposdata: LinePos;
}
interface LineData{
  x1: number,
  x2: number,
  y1: number,
  y2: number,
}

const Connection: React.FC<Props> = (props) => {
  const {
    id,
    date_established,
    closeness,
    nicknamechildtoparent,
    nicknameparenttochild,
    inviter,
    invitee
  } = props.data;
  const parent_id = props.parent_id;
  const { dispatch } = useContext(AppContext)
  const [childNodeSize, setChildNodeSize] = useState<number>(80);
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
    const nodeSize = props.nodeSize;
    if(closeness === 'friend'){
      setChildNodeSize(nodeSize - 15);
    } else if(closeness === 'closefriend'){
      setChildNodeSize(nodeSize - 10);
    } else{
      setChildNodeSize(nodeSize - 5);
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
  }, [window.innerHeight, window.innerWidth])
  const handleLineCLick = (e:any) =>{
    e.stopPropagation();
    dispatch(clickedConnection(id));
  }


  return (
    <>
      <LineBox fullPosdata={fullPosdata} height={fullPosdata.height} width={fullPosdata.width} id={`connection ${id}`}>
        <g onMouseOver={(e) => e.stopPropagation()}
            className="hover-effect">
          <line
            x1={`${lineData.x1}%`}
            y1={`${lineData.y1}%`}
            x2={`${lineData.x2}%`}
            y2={`${lineData.y2}%`}
            style={{ stroke: 'white', strokeWidth: 2 }}
            onClick={handleLineCLick}
          />
          <title>{`Connection ID: ${id}\nDate Established: ${date_established}\nCloseness: ${closeness}`}</title>
        </g>
      </LineBox>
      <UserNode user_id = {inviter === parent_id? invitee: inviter}
                posData={props.endposdata}
                connectionState = {false}
                nodeSize={childNodeSize}
                parent_id={parent_id}
                ></UserNode>
    </>
  );
};

export default Connection;
