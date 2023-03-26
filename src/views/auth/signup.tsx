import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';

import { inputClass } from '@/constant/classnames';
import { AuthService } from '@/firebase/auth/auth-service';

export default function SignUpView() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
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
    }
  };
  return (
    <div className='flex items-center justify-center'>
      <form
        className='flex h-full flex-col justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder='Enter username'
          className={inputClass}
          {...register('username', { required: true })}
        ></input>
        <input
          placeholder='Enter email address'
          className={inputClass}
          {...register('email', { required: true })}
        ></input>
        <input
          placeholder='Enter your password'
          className={inputClass}
          {...register('password', { required: true })}
        ></input>
        <input
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
          className='inline-flex h-12 w-full items-center justify-center px-6 font-medium tracking-wide text-white transition duration-200'
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
