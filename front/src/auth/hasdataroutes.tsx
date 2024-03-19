/* eslint-disable node/no-unpublished-import */
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../lib/hooks/useUser';


export default function DataRoutes () {
  const user = useUser();
  if (!user?.has_data) {
    return <Navigate to='/add'/>
  }
  return <Outlet/>
}

