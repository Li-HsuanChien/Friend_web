/* eslint-disable node/no-unpublished-import */
import React, { useEffect, useState, useContext } from 'react';
import { styled } from 'styled-components';
import { AppContext } from '../../../AppContext';
import Connection from './connector';
import { Url } from 'url';
import { Link, useNavigate } from 'react-router-dom';

type Gender = 'M' | 'F' | 'N' | 'NA'

// eslint-disable-next-line node/no-unsupported-features/node-builtins

interface Posdata {
  posx: number,
  posy: number
}

const NodeStyle = styled.div<{ posdata?: Posdata, nodeSize?:number }>`
  position: absolute;
  ${props => props.nodeSize ? `width: ${props.nodeSize}px` : '80px'};
  ${props => props.nodeSize ? `height: ${props.nodeSize}px` : '80px'};
  background-color: white;
  border-radius: 50%;
  ${props => props.posdata ? `top: ${props.posdata.posy}vh` : '0'};
  ${props => props.posdata ? `left: ${props.posdata.posx}vw` : '0'};
`;
interface SuccessUserData {
  username: string,
  bio: string | null,
  headshot: Url | null,
  gender: Gender,
  date_of_birth: string,
  show_horoscope: boolean,
  instagram_link: Url | null,
  facebook_link: Url | null,
  snapchat_link: Url | null,
  inviteurl: Url,
  created_time: string
}
type userData = SuccessUserData;
async function getUserData(user_id: number, Token: string): Promise<userData> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ user_id: user_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to get user data')
    }
    const userData: userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Get User data error:', error);
    throw error;
  }
}
interface connectiontype {
  id: number,
  date_established: string,
  closeness: string,
  nicknamechildtoparent?: string,
  nicknameparenttochild?: string,
  inviter: number,
  invitee: number,
}
async function getConnection(user_id: number, Token: string, csrf: string): Promise<connectiontype[]> {
  try {
    console.log(csrf);
    const response = await fetch('http://127.0.0.1:8000/api/connections', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ user_id: user_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to get user connection')
    }
    const connections: connectiontype[] = await response.json();
    return connections;
  } catch (error) {
    console.error('Get User data error:', error);
    throw error;
  }
}

function calcpos(itemcount: number,
  evenunit: number,
  oddunit: number,
  startposx: number,
  startposy: number): Posdata[] {
  const split = Math.PI / itemcount;
  const res: Posdata[] = []
  for (let i = 0; i < itemcount; i++) {
    const unit = i % 2 === 0 ? evenunit : oddunit;
    res.push({
      posy: (startposy - unit * Math.sin((Math.PI / 8) + split * i)),
      posx: (startposx + unit * Math.cos((Math.PI / 8) + split * i))
    });
  }
  return res;
}

type Combinearr = connectiontype & Posdata;

const UserNode: React.FC<{ user_id: number, posData: Posdata,
                           connectionState: boolean, nodeSize:number }>
                            = ({ user_id, posData, connectionState, nodeSize }) => {
  const { dispatch, jwt, csrf } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState<userData>();
  const [connections, setConnections] = useState<connectiontype[]>();
  const [endposarr, setEndPosArr] = useState<Posdata[]>([]);
  const [combineArr, setCombineArr] = useState<Combinearr[]>([]);
  const [showConnection, setShowConnection] = useState<boolean>(connectionState);
  const nodeSizeInVw = (nodeSize / window.innerWidth) * 100;
  const nodeSizeMidPointInVw = nodeSizeInVw/2;
  const lineStartPos = {posx: posData.posx+nodeSizeMidPointInVw,
                        posy: posData.posy+nodeSizeMidPointInVw}

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
      getConnection(user_id, jwt, csrf as string)
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
        30,
        50,
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
          onClick={() => setShowConnection(!showConnection)}>
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
