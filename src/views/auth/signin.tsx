import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';

import { inputClass } from '@/constant/classnames';
import { AuthService } from '@/firebase/auth/auth-service';

export default function SignInView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      await AuthService.signInWithEmail(data.email, data.password);
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
          className={inputClass}
          placeholder='Enter email address'
          {...register('email', { required: true })}
        ></input>
        <input
          className={inputClass}
          placeholder='Enter your password'
          {...register('password', { required: true })}
        ></input>
        {errors.password && <div>{errors.password.message?.toString()}</div>}
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
