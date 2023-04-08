import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';

import { inputClass } from '@/constant/classnames';
import { AuthService } from '@/firebase/auth/auth-service';

export default function SignUpView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await AuthService.signUpWithEmail(
        data.email,
        data.password,
        data.username
      );
      router.push('/home');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex items-center justify-center'>
      <form
        className='flex h-full w-full flex-col justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type='text'
          placeholder='Enter username'
          className={inputClass}
          {...register('username', { required: true })}
        ></input>
        <input
          type='email'
          placeholder='Enter email address'
          className={inputClass}
          {...register('email', { required: true })}
        ></input>
        <input
          type='password'
          placeholder='Enter your password'
          className={inputClass}
          {...register('password', { required: true })}
        ></input>
        <input
          type='password'
          placeholder='Re-type your password'
          className={inputClass}
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
        <Button
          type='submit'
          isLoading={loading}
          className='mt-4 inline-flex h-12 w-full items-center justify-center px-6 font-medium tracking-wide text-white transition duration-200'
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
