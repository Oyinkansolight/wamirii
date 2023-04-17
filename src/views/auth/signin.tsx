import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import PrimaryLink from '@/components/links/PrimaryLink';

import { inputClass } from '@/constant/classnames';
import { AuthService } from '@/firebase/auth/auth-service';

export default function SignInView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await AuthService.signInWithEmail(data.email, data.password);
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
          type='email'
          className={inputClass}
          placeholder='Enter email address'
          {...register('email', { required: true })}
        ></input>
        <input
          type='password'
          className={inputClass}
          placeholder='Enter your password'
          {...register('password', { required: true })}
        ></input>

        <PrimaryLink href='/' className='text-xs'>
          Forgot your password?
        </PrimaryLink>
        {errors.password && <div>{errors.password.message?.toString()}</div>}
        <div className='text-end'>
          Don't an account?{' '}
          <Link className='text-primary ' href='/?auth=1'>
            Sign Up
          </Link>
        </div>
        <Button
          isLoading={loading}
          type='submit'
          className='mt-4 inline-flex h-12 w-full items-center justify-center px-6 font-medium tracking-wide text-white transition duration-200'
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
