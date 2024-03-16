import { useState, useEffect } from 'react';
import { useToken } from './useToken';

const getPayloadFromToken = (token: string) => {
  const encodedPayload = token.split('.')[1];
  return JSON.parse(atob(encodedPayload));
}

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

export const useUser = () => {
  const [token] = useToken();

  const [user, setUser] = useState(() => {
      if (!token) return null;
      return getPayloadFromToken(token as string);
  });

  useEffect(() => {
      if (!token) {
          setUser(null);
      } else {
        PingServer(token as string)
        .then(() =>{
          setUser(getPayloadFromToken(token as string));
        })
        .catch(() => {
            localStorage.removeItem('JWTToken');
            setUser(null);
        })
      }
  }, [token]);

  return user;
}

