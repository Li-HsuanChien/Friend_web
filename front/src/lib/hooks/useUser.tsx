import { useState, useEffect } from 'react';
import { useToken } from './useToken';

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

export const useUser = () => {
  const [token] = useToken();

  const [user, setUser] = useState<Userhookdata | null>(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);


  return user;
}

