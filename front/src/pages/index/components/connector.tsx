import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const LineBox = styled.svg<{ fullPosdata?: fullPosdata }>`
  position: fixed;
  ${props => props.fullPosdata ? `top: ${props.fullPosdata.top}vh` : '0'};
  ${props => props.fullPosdata ? `left: ${props.fullPosdata.left}vw` : '0'};
  ${props => props.fullPosdata ? `width: ${props.fullPosdata.width}vw` : '0'};
  ${props => props.fullPosdata ? `height: ${props.fullPosdata.height}vh` : '0'};
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

interface fullPosdata{
  top: number,
  left: number,
  height: number,
  width:  number
}
interface Props {
  data: ConnectionProps;
  startposdata: Posdata;
  endposdata: Posdata;
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
    const startPosx = props.startposdata.posx;
    const startPosy = props.startposdata.posy;
    const endPosx = props.endposdata.posx;
    const endPosy = props.endposdata.posy;

    SetFullPosData({
      top: Math.min(startPosy, endPosy),
      left: Math.min(startPosx, endPosx),
      height: Math.abs(startPosy - endPosy),
      width:  Math.abs(startPosx - endPosx),
    })
    if((endPosy < startPosy && endPosx > startPosx) || (endPosy > startPosy && endPosx < endPosx)){
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


  return (
    <LineBox fullPosdata={fullPosdata} height={fullPosdata.height} width={fullPosdata.width} id={`connection ${id}`}>
      <line
        x1={`${lineData.x1}%`}
        y1={`${lineData.y1}%`}
        x2={`${lineData.x2}%`}
        y2={`${lineData.y2}%`}
        style={{ stroke: 'white', strokeWidth: 2 }}
      />
    </LineBox>
  );
};

export default Connection;
