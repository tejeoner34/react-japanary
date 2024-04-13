import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormFields = {
  email: string;
  password: string;
};

const EMAIL_REQUIREMENT_OPTIONS = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address',
  },
};

const PASSWORD_REQUIREMENT_OPTIONS = {
  required: 'Password is required',
  minLength: { value: 8, message: 'Password must be at least 8 characters' },
};

const errorTpl = (errorMessage: string) => {
  return (
    <div>
      <p>{errorMessage}</p>
    </div>
  );
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
      className="flex flex-col justify-center items-center gap-2 p-5 max-w-md m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input {...register('email', EMAIL_REQUIREMENT_OPTIONS)} type="text" placeholder="email..." />
      {errors.email?.message && errorTpl(errors.email.message)}
      <Input
        {...register('password', PASSWORD_REQUIREMENT_OPTIONS)}
        type="password"
        placeholder="password..."
      />
      {errors.password?.message && errorTpl(errors.password.message)}

      <Button disabled={isSubmitting} type="submit" variant="default">
        Login
      </Button>
    </form>
  );
}
