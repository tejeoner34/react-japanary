import { SubmitHandler, useForm } from 'react-hook-form';
import { EMAIL_REQUIREMENT_OPTIONS, PASSWORD_REQUIREMENT_OPTIONS } from '../utils';
import { Button, Input } from '@/common/components/ui';
import ErrorMessage from '@/common/components/ui/errors/ErrorMessage';

type FormFields = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onFormSubmit: (data: FormFields) => void;
}

export default function LoginForm({ onFormSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // setError,
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // Podemos tener un try catch y en el caso de tener un error del back indicarlo a traves del método setError
    onFormSubmit(data);
  };

  return (
    <form
      className="flex flex-col justify-center gap-3 p-5 max-w-md m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register('email', EMAIL_REQUIREMENT_OPTIONS)}
        type="text"
        placeholder="email..."
        autoComplete="username"
      />
      {errors.email?.message && <ErrorMessage message={errors.email.message} />}
      <Input
        {...register('password', PASSWORD_REQUIREMENT_OPTIONS)}
        type="password"
        placeholder="password..."
        autoComplete="current-password"
      />
      {errors.password?.message && <ErrorMessage message={errors.password.message} />}

      <Button disabled={isSubmitting} type="submit" variant="default">
        Login
      </Button>
    </form>
  );
}
