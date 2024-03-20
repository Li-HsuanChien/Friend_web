import { useState } from 'react';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom';

async function PingServer(Token: string): Promise<void> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get user data');
    }
    return;
  } catch (error) {
    console.error('Get User data error:', error);
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
      nav('login');
    })
    return jwt;
});


  const setToken = (newToken: string) =>{
    localStorage.setItem('JWTToken', newToken);
    setInternalToken(newToken);
  }

  return [token, setToken];

}
