/* eslint-disable node/no-unpublished-import */
import React, { useEffect, useState, useContext } from 'react';
import { styled } from 'styled-components';
import { AppContext } from '../../../AppContext';
// import Connections from './connectors';
import { Url } from 'url';
import { Link, useNavigate } from 'react-router-dom';

type Gender = 'M' | 'F' | 'N' | 'NA'

// eslint-disable-next-line node/no-unsupported-features/node-builtins
const NodeStyle = styled.div<{current:boolean}>`
  position: absolute;
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 50%; 
  ${props => props.current  && `
         top:45vh;
         left:50vw;
    `}
`
interface SuccessUserData{
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

const UserNode: React.FC<{user_id: number, current:boolean}> = ({user_id, current}) => {
  const {dispatch, jwt} = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState<userData>();
  useEffect(() =>{
    if(user_id){
      getUserData(user_id, jwt as string)
      .then((result) => {
        console.log(`The data fetch returns ${result}`)
        setData(result);
      })
      .catch((error) =>{
        navigate('/add');
      })
    }
    else{
      console.error('You have no cridencials!');
      navigate('/login');
    }
  }, []);


  return (
    <>
      { data && <NodeStyle title={`${data.username}`} current = {current}></NodeStyle>}
    </>
  );
};

export default UserNode;
