/* eslint-disable node/no-unpublished-import */
import React, { useEffect, useState, useContext } from 'react';
import { styled } from 'styled-components';
import { AppContext } from '../../../AppContext';
import Connection from './connector';
import { Url } from 'url';
import { Link, useNavigate } from 'react-router-dom';

type Gender = 'M' | 'F' | 'N' | 'NA'

// eslint-disable-next-line node/no-unsupported-features/node-builtins
const NodeStyle = styled.div<{ current: string }>`
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%; 
  ${props => props.current && `
         top:45vh;
         left:50vw;
    `}
`
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

const UserNode: React.FC<{ user_id: number, current: string }> = ({ user_id, current }) => {
  const { dispatch, jwt, csrf } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState<userData>();
  const [connections, setconnections] = useState<connectiontype[]>();

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
          setconnections(result);
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

  return (
    <>
      {data && <NodeStyle title={`${data.username}`} current={current}>
        {connections?.map((connection) => <Connection key={connection.id} data={connection} />)}
      </NodeStyle>}
    </>
  );
};

export default UserNode;
