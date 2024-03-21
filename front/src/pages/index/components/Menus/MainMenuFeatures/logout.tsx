import React , { Dispatch } from 'react';
import styled from 'styled-components';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useToken } from '../../../../../lib/hooks/useToken';
import { useRefreshToken } from '../../../../../lib/hooks/useRefreshToken';
// eslint-disable-next-line node/no-unpublished-import
import { useNavigate } from 'react-router-dom';

const Close = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
`;

async function logout(Token: string, refresh_token: string){
  try {
    const response = await fetch('http://127.0.0.1:8000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify({ refresh_token: refresh_token }),
    });
    if (!response.ok) {
      throw new Error('Failed to log out');
    }
    return;
  } catch (error) {
    console.error('Failed to log out:', error);
    throw error;
  }
}
const Logout: React.FC<{setChild:Dispatch<boolean>}>  = ( {setChild} ) =>{
  const [refreshjwt,] = useRefreshToken();
  const [jwt, ] = useToken();
  const navigate = useNavigate();

  const handleClick = (e:any) =>{
    e.preventDefault();
    window.localStorage.removeItem('JWTToken');
    window.localStorage.removeItem('JWTRefreshToken');
    logout(jwt as string, refreshjwt)
    .then(()=> navigate('/login'))
  }

  return(
    <>
      <button onClick={handleClick} >Logout!</button>
      <Close><IoIosCloseCircleOutline onClick={()=>setChild(false)} /></Close>
    </>
  )
}


export default Logout;
