import { SubmitHandler, useForm } from 'react-hook-form';
import { EMAIL_REQUIREMENT_OPTIONS, PASSWORD_REQUIREMENT_OPTIONS } from '../utils';
import { Button, Input } from '@/common/components/ui';
import ErrorMessage from '@/common/components/ui/errors/ErrorMessage';

type FormFields = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col justify-center gap-2 p-5 max-w-md m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input {...register('email', EMAIL_REQUIREMENT_OPTIONS)} type="text" placeholder="email..." />
      {errors.email?.message && <ErrorMessage message={errors.email.message} />}
      <Input
        {...register('password', PASSWORD_REQUIREMENT_OPTIONS)}
        type="password"
        placeholder="password..."
      />
      {errors.password?.message && <ErrorMessage message={errors.password.message} />}

      <Button disabled={isSubmitting} type="submit" variant="default">
        Login
      </Button>
    </form>
  );
}
