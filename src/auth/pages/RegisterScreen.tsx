import { Spinner } from '@/common/components/ui';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import CustomText from '@/common/components/ui/CustomText';

export default function RegisterScreen() {
  const { errorMessage, isFetching, signUpUser } = useAuth();

  if (isFetching) return <Spinner />;
  return (
    <div className="w-full m-auto">
      <CustomText tag="h1" text="Sign Up" />
      <CustomText
        styles="text-center pt-3"
        tag="h4"
        text="Create an account to create decks and flash cards and access them fron different devices"
      />
      <RegisterForm onFormSubmit={signUpUser} />
      {errorMessage && <CustomText styles="text-center text-error" tag="p" text={errorMessage} />}
    </div>
  );
}
