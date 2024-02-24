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
const StyleDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #080710;
  margin: 0;
  display: flex;
  flex-flow: column nowrap;

  user-select: none;

  div {
    flex: 1;

    display: grid;
    grid-template: 1fr / 3em 9em 1fr;
  }
`
interface pingSuccessResponse{
  username:string,
  id: number
}

async function PingServer(Token: string): Promise<pingSuccessResponse> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/currentuser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
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
  const { jwt, dispatch } = useContext(AppContext);
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
      <StyleDiv>
        <Topright>
          <Menu/>
        </Topright>
        <WorkspaceComponent />
      </StyleDiv>
    </>
  )
  ;
}

export default Main;
