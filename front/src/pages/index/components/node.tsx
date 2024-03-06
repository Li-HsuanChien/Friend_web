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
interface LinePos extends Posdata{
  angle: number,
}
const NodeStyle = styled.div<{ posdata: Posdata, nodeSize:number }>`
  position: fixed;
  ${props => props.nodeSize ? `width: ${props.nodeSize}px` : '80px'};
  ${props => props.nodeSize ? `height: ${props.nodeSize}px` : '80px'};
  background-color: white;
  border-radius: 50%;
  ${props => props.posdata ? `top: ${props.posdata.posy - (pxToVH(props.nodeSize)/2)}vh` : '0'};
  ${props => props.posdata ? `left: ${props.posdata.posx -(pxToVW(props.nodeSize)/2)}vw` : '0'};
`;


function calcpos(
  parent_angle:number,
  itemcount: number,
  evenunit: number,
  oddunit: number,
  startposx: number,
  startposy: number,
  main: boolean): LinePos[] {
  console.log('main', main);
  console.log('items', itemcount)
  const split = 2 * Math.PI / (itemcount);
  console.log('split', split)
  const res: LinePos[] = []
  for (let i = 0; i <= itemcount; i++) {
    if(main && i === 0) continue;
    const unit = i % 2 === 0 ? evenunit : oddunit;
    console.log('parentangle',i, parent_angle)
    const Angle = ((parent_angle)) + split * i;
    console.log(Angle)
    const YDiffPx = unit * Math.sin(Angle);
    const XDiffPx = unit * Math.cos(Angle);
    res.push({
      posy: startposy - pxToVH(YDiffPx),
      posx: startposx + pxToVW(XDiffPx),
      angle: Angle
    });
  }
  return res;
}
//TBD unit change function

type Combinearr = Connectiontype & LinePos;

const UserNode: React.FC<{ user_id: number, posData: LinePos,
                           connectionState: boolean, nodeSize:number, parent_id?:number}>
                            = ({ user_id, posData, connectionState, nodeSize, parent_id}) => {
  const { dispatch, jwt, current_user_id } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState<SuccessUserData>();
  const [connections, setConnections] = useState<Connectiontype[]>();
  const [endposarr, setEndPosArr] = useState<LinePos[]>([]);
  const [combineArr, setCombineArr] = useState<Combinearr[]>([]);
  const [showConnection, setShowConnection] = useState<boolean>(connectionState);
  useEffect(() => {
    console.log(user_id, 'started');
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
      const main = (user_id === current_user_id)
      const calculatedPos = calcpos(
        posData.angle,
        connections.length,
        140,
        180,
        posData.posx,
        posData.posy,
        main
      );
      setEndPosArr(calculatedPos);
    }
  }, [connections]);
  useEffect(() => {
    if(connections){
      let combinedData: Combinearr[] = connections.map((item, index) =>({
        ...item,
        ...endposarr[index]
      }));
      combinedData = combinedData.filter(connection => !(parent_id === (connection.invitee) || parent_id === (connection.inviter)));
      setCombineArr(combinedData);
    }
  }, [endposarr]);

  const handleNodeClick = (e:any)=>{
    e.stopPropagation()
    setShowConnection(!showConnection);
    dispatch(clickedUser(user_id));
  };

  return (
    <>
      {data?(<NodeStyle
          title={`${data.username}`}
          posdata={posData}
          nodeSize={nodeSize}
          onClick={handleNodeClick}>
          {showConnection &&
            combineArr?.map((connection) => <Connection
              key={connection.id}
              data={connection}
              parent_id={user_id}
              nodeSize = {nodeSize}
              startposdata={posData}
              endposdata={{ posx: connection.posx, posy: connection.posy, angle:connection.angle }}
              />)}
        </NodeStyle>): ''}
    </>
  );
};

export default UserNode;
