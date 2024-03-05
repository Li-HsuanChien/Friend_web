import React, { useState } from 'react';
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

  const startPosx = props.startposdata.posx;
  const startPosy = props.startposdata.posy;

  const endPosx = props.endposdata.posx;
  const endPosy = props.endposdata.posy;
  console.log(`${id} startx:${startPosx} starty:${startPosy} endx:${endPosx} endy:${endPosy}`)
  const fullPosdata = {
    top: Math.max(startPosy, endPosy),
    left: Math.min(startPosx, endPosx),
    height: Math.abs(startPosy - endPosy),
    width:  Math.abs(startPosx - endPosx),
  }
  // console.log(startPosx, startPosy, endPosx, endPosy);
  // console.log(fullPosdata)

  return (
    <LineBox fullPosdata={fullPosdata} height={fullPosdata.height} width={fullPosdata.width} id={`connection ${id}`}>
      <line
        x1={`${fullPosdata.left}vw`}
        y1={`${fullPosdata.top}vh`}
        x2={`${fullPosdata.left + fullPosdata.width}vw`}
        y2={`${fullPosdata.top + fullPosdata.height}vh`}
        style={{ stroke: 'white', strokeWidth: 2 }}
      />
    </LineBox>
  );
};

export default Connection;
