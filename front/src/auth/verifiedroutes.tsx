/* eslint-disable node/no-unpublished-import */
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../lib/hooks/useUser';


export default function VerifiedRoutes () {
  const user = useUser();
  if (!user?.email_is_verified) {
    return <Navigate to='/please-verify'/>
  }
  return <Outlet/>
}

