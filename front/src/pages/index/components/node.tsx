import React, { useEffect, useState, useContext } from 'react';
import { styled } from 'styled-components';
import { AppContext } from '../../../AppContext';
// import Connections from './connectors';
import { Url } from 'url';

type Gender = 'M' | 'F' | 'N' | 'NA'

// eslint-disable-next-line node/no-unsupported-features/node-builtins
const NodeStyle = styled.div`

  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 50%; 
`
interface userData{
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

async function getUserData(user_id: number, Token: string): Promise<userData>{
  try{
    const response = await fetch('http://127.0.0.1:8000/api/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({'user_id': user_id}),
    });
    if(!response.ok){
      throw new Error('Failed to get user data')
    }
    const userData: userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Get User data error:', error);
    throw error;
  }
}

const UserNode: React.FC<{user_id: number}> = ({user_id}) => {
  const {dispatch, jwt} = useContext(AppContext);
  const [data, setData] = useState<userData>()

  useEffect(() =>{
    if(user_id){
      getUserData(user_id, jwt as string)
      .then((result) => {
        console.log(result);
        setData(result);
      })
    }
    else{
      console.log('no user_id')
    }
  }, []);


  return (
    <>
      { data && <NodeStyle title={`this is ${data.username}`}></NodeStyle>}
    </>
  );
};

export default UserNode;
