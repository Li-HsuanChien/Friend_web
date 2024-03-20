import { useState } from 'react';

export const useRefreshToken = (): [string, (newToken: string) => void] => {
  const [token, setInternalRefreshToken] = useState<string>(() => {
    const jwt = window.localStorage.getItem('JWTRefreshToken') as string
    return jwt});

  const setRefreshToken = (newToken: string) =>{
    localStorage.setItem('JWTRefreshToken', newToken);
    setInternalRefreshToken(newToken);
  }

  return [token, setRefreshToken];
}
