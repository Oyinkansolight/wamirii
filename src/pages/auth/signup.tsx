import { useForm } from 'react-hook-form';

import { AuthService } from '@/firebase/auth/auth-service';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    await AuthService.signUpWithEmail(data.email, data.password, data.username);
  };
  return (
    <div className='flex h-screen items-center justify-center'>
      <form
        className='flex h-full flex-col justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder='Enter username'
          {...register('username', { required: true })}
        ></input>
        <input
          placeholder='Enter email address'
          {...register('email', { required: true })}
        ></input>
        <input
          placeholder='Enter your password'
          {...register('password', { required: true })}
        ></input>
        <input
          placeholder='Re-type your password'
          {...register('confirm-password', {
            validate: {
              v: () =>
                getValues()['password'] === getValues()['confirm-password'] ||
                'Password mismatch',
            },
          })}
        ></input>
        {errors['confirm-password'] && (
          <div>{errors['confirm-password'].message?.toString()}</div>
        )}
        <input type='submit'></input>
      </form>
    </div>
  );
}
