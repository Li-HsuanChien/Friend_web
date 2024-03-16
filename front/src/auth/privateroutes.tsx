/* eslint-disable node/no-unpublished-import */
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../lib/hooks/useUser';


export default function PrivateRoutes () {
  const user = useUser();
  if (!user) {
    return <Navigate to='/login'/>
  }
  return <Outlet/>
}

