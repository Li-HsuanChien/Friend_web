import { useState } from 'react';



export const useToken = (): [string, (newToken: string) => void] => {
  const [token, setInternalToken] = useState<string>(() => {
    const jwt = window.localStorage.getItem('JWTToken') as string;
    return jwt;
});


  const setToken = (newToken: string) =>{
    localStorage.setItem('JWTToken', newToken);
    setInternalToken(newToken);
  }

  return [token, setToken];

}
