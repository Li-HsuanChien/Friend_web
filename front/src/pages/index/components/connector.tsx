import React, { useState } from 'react';

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

  const startposx = props.startposdata.posx;
  const startposy = props.startposdata.posy;

  const endPosx = props.endposdata.posx; // Add 50 pixels to the x-coordinate
  const endPosy = props.endposdata.posy; // Add 50 pixels to the y-coordinate

  return (
    <svg>
      <line
        x1={startposx}
        y1={startposy}
        x2={endPosx}
        y2={endPosy}
        style={{ stroke: 'white', strokeWidth: 2 }}
      />
    </svg>
  );
};

export default Connection;
