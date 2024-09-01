import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { isUserLogged } = useAuth();
  console.log('protected route', isUserLogged);
  return isUserLogged ? <Outlet /> : <Navigate replace to="/auth/login" />;
}
