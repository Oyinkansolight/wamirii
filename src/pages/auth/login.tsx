import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { toast } from 'react-toastify';

import ListingFoundCard from '@/components/cards/ListingFoundCard';

import { AuthService } from '@/firebase/auth/auth-service';
import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const u = await AuthService.signInWithEmail(data.email, data.password);
      FirestoreService.getUserDoc(u.user.uid, (user) => {
        router.push(`/${user.role}`);
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      reset({ email: '', password: '' });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGmail = useCallback(async () => {
    try {
      const u = await AuthService.signInWithGmail();
      FirestoreService.getUserDoc(u.user.uid, (user) => {
        router.push(`/${user.role}`);
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [router]);

  return (
    <section className='relative'>
      <div className='absolute -z-10 h-screen w-screen'>
        <Image
          className='-z-10'
          src='/images/login-background.png'
          alt='background'
          fill
        />
        <ListingFoundCard
          img='/images/face_1.jpeg'
          name='Emma Nelson'
          gender='M'
          foundIn='Kano'
          age={16}
          className='absolute top-80 left-10 -z-10'
        />
        <ListingFoundCard
          img='/images/face_3.jpeg'
          name='Jude Okafor'
          gender='M'
          foundIn='Yaba Lagos'
          age={30}
          className='absolute top-24 right-96 -z-10'
        />
        <ListingFoundCard
          img='/images/face_2.jpeg'
          name='Omolara Hassan'
          gender='M'
          foundIn='Yaba Lagos'
          age={30}
          className='absolute bottom-20 right-20 -z-10'
        />
      </div>
      <div className='flex h-screen flex-col items-center justify-center px-2 py-2 lg:py-0'>
        <div className='w-full rounded-2xl bg-white shadow sm:min-w-[30rem] sm:max-w-md'>
          <div className='space-y-2 p-6 sm:p-10'>
            <a
              href='#'
              className='flex items-center text-2xl font-semibold text-gray-900'
            >
              <Image
                src='/images/logo.png'
                alt='logo'
                height={100}
                width={100}
              />
            </a>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl'>
              Login
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-900 '
                >
                  Your email
                </label>
                <input
                  type='email'
                  {...register('email')}
                  id='email'
                  className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600       sm:text-sm'
                  placeholder='name@company.com'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='mb-2 flex justify-between text-sm font-medium text-gray-900 '
                >
                  <div>Password</div>
                  <Link
                    href='/auth/forgot-password'
                    className='text-sm font-medium text-primary hover:underline '
                  >
                    Forgot password?
                  </Link>
                </label>
                <input
                  type='password'
                  {...register('password')}
                  id='password'
                  placeholder='••••••••'
                  className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600       sm:text-sm'
                  required
                />
              </div>
              <button
                disabled={loading}
                type='submit'
                className='w-full rounded bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300   '
              >
                Login
              </button>
              <div className='h-6' />
              <GoogleLoginButton
                className='m-0'
                style={{ margin: '0px', width: '100%' }}
                onClick={signInWithGmail}
              />
              <p className='text-sm font-light text-gray-500 '>
                Don’t have an account yet?{' '}
                <Link
                  href='/auth/register'
                  className='font-medium text-primary hover:underline '
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
