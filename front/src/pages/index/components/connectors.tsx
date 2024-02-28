import React, { useState } from 'react';
import { styled } from 'styled-components';

//remember connection is two sided now
const Connections: React.FC<number> = (connect_id: number) => {


  return (
    <h1>{connect_id}</h1>
  );
};

export default Connections;
