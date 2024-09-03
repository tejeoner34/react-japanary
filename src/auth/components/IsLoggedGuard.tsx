import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function IsLoggedGuard({ redirectTo = '/' }) {
  const { isUserLogged } = useAuth();

  return isUserLogged ? <Navigate replace to={redirectTo} /> : <Outlet />;
}
