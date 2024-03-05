/* eslint-disable node/no-unpublished-import */
import React, { useEffect, useState, useContext } from 'react';
import { styled } from 'styled-components';
import { AppContext } from '../../../AppContext';
import {clickedUser} from  '../../../actions';
import Connection from './connector';
import { useNavigate } from 'react-router-dom';
import getUserData, { SuccessUserData } from '../../../lib/getUserData';
import getConnection, { Connectiontype } from '../../../lib/getConnection';
import { pxToVH, pxToVW } from '../../../lib/pxToVSize';

// eslint-disable-next-line node/no-unsupported-features/node-builtins
interface Posdata {
  posx: number,
  posy: number
}
const NodeStyle = styled.div<{ posdata?: Posdata, nodeSize?:number }>`
  position: fixed;
  ${props => props.nodeSize ? `width: ${props.nodeSize}px` : '80px'};
  ${props => props.nodeSize ? `height: ${props.nodeSize}px` : '80px'};
  background-color: white;
  border-radius: 50%;
  ${props => props.posdata ? `top: ${props.posdata.posy}vh` : '0'};
  ${props => props.posdata ? `left: ${props.posdata.posx}vw` : '0'};
`;


function calcpos(itemcount: number,
  evenunit: number,
  oddunit: number,
  startposx: number,
  startposy: number): Posdata[] {
  const split = 2 * Math.PI / itemcount;
  const res: Posdata[] = []
  for (let i = 0; i < itemcount; i++) {
    const unit = i % 2 === 0 ? evenunit : oddunit;
    const Angle = (Math.PI / 4) + split * i;
    const YDiffPx = unit * Math.sin(Angle);
    const XDiffPx = unit * Math.cos(Angle);
    res.push({
      posy: startposy - pxToVH(YDiffPx),
      posx: startposx + pxToVW(XDiffPx)
    });
  }
  return res;
}
//TBD unit change function

type Combinearr = Connectiontype & Posdata;

const UserNode: React.FC<{ user_id: number, posData: Posdata,
                           connectionState: boolean, nodeSize:number }>
                            = ({ user_id, posData, connectionState, nodeSize }) => {
  const { dispatch, jwt } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState<SuccessUserData>();
  const [connections, setConnections] = useState<Connectiontype[]>();
  const [endposarr, setEndPosArr] = useState<Posdata[]>([]);
  const [combineArr, setCombineArr] = useState<Combinearr[]>([]);
  const [showConnection, setShowConnection] = useState<boolean>(connectionState);
  const nodeSizeInVwX = pxToVW(nodeSize);
  const nodeSizeInVwY = pxToVH(nodeSize);
  const nodeSizeMidPointInVwX = nodeSizeInVwX/2;
  const nodeSizeMidPointInVwY = nodeSizeInVwY/2;
  const lineStartPos = {posx: posData.posx+nodeSizeMidPointInVwX,
                        posy: posData.posy+nodeSizeMidPointInVwY}

  useEffect(() => {
    if (user_id && jwt) {
      getUserData(user_id, jwt)
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error('Failed to get user data:', error);
          // Handle error appropriately, e.g., show a toast message
          navigate('/add');
        });
      getConnection(user_id, jwt)
        .then((result) => {
          setConnections(result);
        })
        .catch((error) => {
          console.error('Failed to get user connections:', error);
          // Handle error appropriately, e.g., show a toast message
        });
    } else {
      console.error('You have no credentials!');
      navigate('/login');
    }
  }, [user_id, jwt]);
  useEffect(() => {
    if (connections && connections.length > 0) {
      const calculatedPos = calcpos(
        connections.length,
        100,
        120,
        lineStartPos.posx,
        lineStartPos.posy
      );
      setEndPosArr(calculatedPos);
    }
  }, [connections]);
  useEffect(() => {
    if(connections){
      const combinedData: Combinearr[] = connections.map((item, index) =>({
        ...item,
        ...endposarr[index]
      }));
      setCombineArr(combinedData);
    }
  }, [endposarr]);

  return (
    <>
      {data &&
        <NodeStyle
          title={`${data.username}`}
          posdata={posData}
          nodeSize={nodeSize}
          onClick={() => {
                            setShowConnection(!showConnection)
                            dispatch(clickedUser(user_id))}}>
          {showConnection &&
            combineArr?.map((connection) => <Connection
              key={connection.id}
              data={connection}
              startposdata={lineStartPos}
              endposdata={{ posx: connection.posx, posy: connection.posy }}
              />)}
        </NodeStyle>}
    </>
  );
};

export default UserNode;
