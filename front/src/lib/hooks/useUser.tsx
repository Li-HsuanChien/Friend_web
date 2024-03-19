import { useState, useEffect } from 'react';
import { useToken } from './useToken';
/* eslint-disable node/no-unpublished-import */
import { Navigate } from 'react-router-dom';
import { getUserData } from '../UserDataFunctions';

const getPayloadFromToken = (token: string) => {
  const encodedPayload = token.split('.')[1];
  return JSON.parse(atob(encodedPayload));
}
interface Userhookdata{
  token_type:'access',
  exp?:number,
  iat?:number,
  jti?:string,
  user_id:string,
  email_is_verified?:boolean,
  has_data?: boolean,
}
interface pingSuccessResponse{
  username:string,
  id: number
}
interface verifystatus{
  email: string,
  email_is_verified: boolean}

async function GetVerificationStatus(Token: string): Promise<verifystatus> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/verify-status', {
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

  const [user, setUser] = useState<Userhookdata | null>(() => {
      if (!token) return null;
      return getPayloadFromToken(token as string);
  });

  useEffect(() => {
    if (!token) {
        setUser(null);
    } else {
      let is_verify: boolean;

      GetVerificationStatus(token as string)
          .then(res => {
              is_verify = res.email_is_verified;
              return getUserData(getPayloadFromToken(token as string).user_id, token);
          })
          .then(() => {
              setUser({
                  ...getPayloadFromToken(token as string),
                  email_is_verified: is_verify,
                  has_data: true
              });
          })
          .catch(() => {
              setUser({
                  ...getPayloadFromToken(token as string),
                  email_is_verified: is_verify,
                  has_data: false
              });
          });
    }
  }, [token]);


  return user;
}

