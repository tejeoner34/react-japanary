import LoginForm from '@/auth/components/LoginForm';
import { useAuth } from '../hooks/useAuth';
import CustomText from '@/common/components/ui/CustomText';
import { Spinner } from '@/common/components/ui';
import { Link } from 'react-router-dom';

export default function LoginScreen() {
  const { errorMessage, isFetching, signInUser } = useAuth();

  if (isFetching) return <Spinner />;
  return (
    <div className="w-full m-auto">
      <CustomText tag="h1" text="Sign In" />
      <LoginForm onFormSubmit={signInUser} />
      {errorMessage && <CustomText styles="text-center text-error" tag="p" text={errorMessage} />}
      <Link to="/auth/register" className="text-linkPrimary">
        <CustomText styles="text-center" tag="p" text="Don't have an account? Register" />
      </Link>
    </div>
  );
}
