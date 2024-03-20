/* eslint-disable node/no-unpublished-import */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function PingServer(Token: string): Promise<void> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/currentuser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to Ping server');
    }
    return;
  } catch (error) {
    console.error('Ping server error:', error);
    throw error;
  }
}



export const useToken = (): [string | null, (newToken: string) => void] => {
  const nav = useNavigate()
  const [token, setInternalToken] = useState<string | null>(() => {
    const jwt = window.localStorage.getItem('JWTToken') as string;
    PingServer(jwt)
    .catch(() => {
      window.localStorage.removeItem('JWTToken');
      nav('/login');
    })
    return jwt;
});


  const setToken = (newToken: string) =>{
    localStorage.setItem('JWTToken', newToken);
    setInternalToken(newToken);
  }

  return [token, setToken];

}
