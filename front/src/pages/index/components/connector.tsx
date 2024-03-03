import React, { useState, useContext } from 'react';


interface ConnectionProps {
  data: {
    id: number;
    date_established: string;
    closeness: string;
    nicknamechildtoparent?: string;
    nicknameparenttochild?: string;
    inviter: number;
    invitee: number;
  };
}

const Connection: React.FC<ConnectionProps> = ({ data }) => {
  console.log(data)
  const {
    id,
    date_established,
    closeness,
    nicknamechildtoparent,
    nicknameparenttochild,
    inviter,
    invitee
  } = data;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default Connection;