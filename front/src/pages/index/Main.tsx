/* eslint-disable node/no-unpublished-import */
import React, { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import WorkspaceComponent from './components/workspace';
import Menu from './components/menu';
import styled from 'styled-components';
import { AppContext } from '../../AppContext';
import { sendCurrentId, sendCurrentUsername } from '../../actions';

const Topright = styled.div`
  {
    opacity: 0;
    position: absolute;
    left: 1600px;
    top: 50px;
  }
`
interface pingSuccessResponse{
  username:string,
  id: number
}

async function PingServer(Token: string): Promise<pingSuccessResponse> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/currentuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify(Token),
    });
    if (!response.ok) {
      throw new Error('Failed to ping server');
    }
    return response.json();
  } catch (error) {
    // Handle error
    console.error('Ping server error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}


function Main() {
  const { current_user_id, jwt, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(()=>{
    const JWTToken = window.localStorage.getItem('JWTToken');
    if (JWTToken) {
      PingServer(JWTToken)
        .then((result) => {
          const { username, id } = result;
          dispatch(sendCurrentId(id));
          dispatch(sendCurrentUsername(username));
        })
        .catch((error) => {
          console.error('Error occurred while pinging server:', error);
          navigate('/login');
        });
    } else if (jwt){
      PingServer(jwt)
        .then((result) => {
          const { username, id } = result;
          dispatch(sendCurrentId(id));
          dispatch(sendCurrentUsername(username));
        })
        .catch((error) => {
          console.error('Error occurred while pinging server:', error);
          navigate('/login');
        });
    }
  }, [])

  return (
    <>

      <Topright>
        <Menu/>
      </Topright>
      <WorkspaceComponent />
    </>
  )
  ;
}

export default Main;
