import LoginForm from '@/auth/components/LoginForm';
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen() {
  const { signUpUser } = useAuth();
  return (
    <div className="w-full m-auto">
      <LoginForm onFormSubmit={signUpUser} />
    </div>
  );
}
