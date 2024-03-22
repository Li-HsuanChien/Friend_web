/* eslint-disable node/no-unpublished-import */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PingServer } from '../AuthApi';


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
