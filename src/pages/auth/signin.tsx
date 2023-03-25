import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthService } from '@/firebase/auth/auth-service';

export default function SignUp() {
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
    <div className='flex h-screen items-center justify-center'>
      <form
        className='flex h-full flex-col justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder='Enter email address'
          {...register('email', { required: true })}
        ></input>
        <input
          placeholder='Enter your password'
          {...register('password', { required: true })}
        ></input>
        {errors.password && <div>{errors.password.message?.toString()}</div>}
        <input type='submit' value='Sign In'></input>
      </form>
    </div>
  );
}
