/* eslint-disable node/no-unpublished-import */
import React, { useEffect, useState, useContext, Dispatch } from 'react';
import { styled } from 'styled-components';
import { AppContext } from '../../../AppContext';
import { clickedUser, sendWorkSpacePos, addShowedUser, removeShowedUser } from '../../../actions';
import Connection from './connector';
import { useNavigate } from 'react-router-dom';
import getUserData from '../../../lib/getUserData';
import getConnection from '../../../lib/getConnection';
import { pxToVH, pxToVW } from '../../../lib/px_V_UnitConversion';
import MainConnection from './mainconnector';
import {SuccessUserData, ConnectionData, Pos} from '../../../lib/Types'
// eslint-disable-next-line node/no-unsupported-features/node-builtins

interface LinePos extends Pos {
  angle: number,
}
const NodeStyle = styled.div<{ posdata: Pos, nodesize: number }>`
  position: fixed;
  ${props => props.nodesize ? `width: ${props.nodesize}px` : '80px'};
  ${props => props.nodesize ? `height: ${props.nodesize}px` : '80px'};
  background-color: white;
  border-radius: 50%;
  ${props => props.posdata ? `top: ${props.posdata.posy - (pxToVH(props.nodesize) / 2)}vh` : '0'};
  ${props => props.posdata ? `left: ${props.posdata.posx - (pxToVW(props.nodesize) / 2)}vw` : '0'};
  img {
    position: fixed;
    ${props => props.nodesize ? `width: ${props.nodesize}px` : '80px'};
    ${props => props.nodesize ? `height: ${props.nodesize}px` : '80px'};
    background-color: white;
    border-radius: 50%;
    border: none; /* add this line to remove the border by default */
    ${props => props.posdata ? `top: ${props.posdata.posy - (pxToVH(props.nodesize) / 2)}vh` : '0'};
    ${props => props.posdata ? `left: ${props.posdata.posx - (pxToVW(props.nodesize) / 2)}vw` : '0'};
    transition: border-color 0.3s; /* add transition for smooth effect */
  }
  img:hover {
    border: 2px solid white; /* add border and change its properties on hover */
  }
`;


function calcpos(
  parent_angle: number,
  itemcount: number,
  evenunit: number,
  oddunit: number,
  startposx: number,
  startposy: number,): LinePos[] {
  const split = 2 * Math.PI / (itemcount);
  const res: LinePos[] = []
  for (let i = 0; i < itemcount; i++) {

    const unit = i % 2 === 0 ? evenunit : oddunit;
    const Angle = ((parent_angle - Math.PI)) + split * i;
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

type Combinearr = ConnectionData & LinePos;

const UserNode: React.FC<{
  user_id: number, posData: LinePos,
  connectionState: boolean, nodesize: number,
  parent_id?: number, setchildName?: Dispatch<string>
}>
  = ({ user_id, posData, connectionState, nodesize, parent_id, setchildName }) => {
    const { dispatch, jwt, current_user_id } = useContext(AppContext);
    const navigate = useNavigate();
    const [data, setData] = useState<SuccessUserData | null>(null);
    const [connections, setConnections] = useState<ConnectionData[]>();
    const [endposarr, setEndPosArr] = useState<LinePos[]>([]);
    const [combineArr, setCombineArr] = useState<Combinearr[]>([]);
    const [showConnection, setShowConnection] = useState<boolean>(connectionState);
    useEffect(() => {
      if (user_id && jwt) {
        getUserData(user_id, jwt)
          .then((result) => {
            setData(result);
            if (setchildName && data) {
              setchildName(result.username);
            }
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
    }, [user_id]);
    useEffect(() => {
      if (setchildName) {
        if (data?.username) {
          const username: string = data.username
          setchildName(username as string);
        }
      }
    }, [data, setShowConnection]);
    useEffect(() => {
      if (connections && connections.length > 0) {
        const calculatedPos = calcpos(
          posData.angle,
          connections.length,
          140,
          180,
          posData.posx,
          posData.posy,
        );
        setEndPosArr(calculatedPos);
      }
    }, [connections, window.innerHeight, window.innerWidth]);
    useEffect(() => {
      if (connections) {
        let combinedData: Combinearr[] = connections.map((item, index) => ({
          ...item,
          ...endposarr[index]
        }));
        combinedData = combinedData.filter(connection => !(parent_id === (connection.invitee) || parent_id === (connection.inviter)));
        setCombineArr(combinedData);
      }
    }, [endposarr, window.innerHeight, window.innerWidth]);

    const handleNodeClick = (e: any) => {
      e.stopPropagation();
      setShowConnection(!showConnection);
    };

    const handleNodeDBClick = (e: any) => {
      e.stopPropagation();
      dispatch(clickedUser(data as SuccessUserData));
      dispatch(sendWorkSpacePos(posData));
    };

    return (
      <>
        {data ? (<NodeStyle
          posdata={posData}
          nodesize={nodesize}
          onClick={handleNodeClick}
          onDoubleClick={handleNodeDBClick}>
          {showConnection &&
            (user_id===current_user_id?(combineArr?.map((connection) => <MainConnection
              key={connection.id}
              data={connection}
              parent={{ id: user_id, username: data.username }}
              nodesize={nodesize}
              startposdata={posData}
              endposdata={{ posx: connection.posx, posy: connection.posy, angle: connection.angle }}
            />)): (combineArr?.map((connection) => <Connection
            key={connection.id}
            data={connection}
            parent={{ id: user_id, username: data.username }}
            nodesize={nodesize}
            startposdata={posData}
            endposdata={{ posx: connection.posx, posy: connection.posy, angle: connection.angle }}
          />)))}
          <img
            src={`http://127.0.0.1:8000/${data.headshot}`}
            alt="Headshot"
            title={`${data.username}`}/>
        </NodeStyle>
        ) : ''}
      </>
    );
  };

export default UserNode;
