import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ListingFoundCard from '@/components/cards/ListingFoundCard';

import { AuthService } from '@/firebase/auth/auth-service';
import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const u = await AuthService.signUpWithEmail(
        data.email,
        data.password,
        data.username
      );
      FirestoreService.getUserDoc(u.user.uid, (user) => {
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/home');
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
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
      <div className='mx-auto flex h-screen flex-col items-center justify-center px-2 py-8 lg:py-0'>
        <div className='w-full rounded-2xl bg-white shadow sm:max-w-md md:mt-0 xl:p-0'>
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
              Register
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-2 md:space-y-4'
            >
              <div>
                <label
                  htmlFor='full-name'
                  className='mb-2 block text-sm font-medium text-gray-900 '
                >
                  Your Full Name
                </label>
                <input
                  type='full-name'
                  {...register('username')}
                  id='full-name'
                  className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600       sm:text-sm'
                  placeholder='First Name Last Name'
                  required
                />
              </div>
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
                  className='mb-2 block text-sm font-medium text-gray-900 '
                >
                  Password
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
              <div>
                <label
                  htmlFor='confirm-password'
                  className='mb-2 block text-sm font-medium text-gray-900 '
                >
                  Confirm password
                </label>
                <input
                  type='password'
                  {...register('confirm-password')}
                  id='confirm-password'
                  placeholder='••••••••'
                  className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600       sm:text-sm'
                  required
                />
              </div>
              <div className='flex items-start'>
                <div className='flex h-5 items-center'>
                  <input
                    id='terms'
                    aria-describedby='terms'
                    type='checkbox'
                    className='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300    '
                    required
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='terms' className='font-light text-gray-500 '>
                    I accept the{' '}
                    <a
                      className='font-medium text-primary hover:underline '
                      href='#'
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                disabled={loading}
                type='submit'
                className='w-full rounded bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300   '
              >
                Create an account
              </button>
              <p className='text-sm font-light text-gray-500 '>
                Already have an account?{' '}
                <Link
                  href='/auth/login'
                  className='font-medium text-primary hover:underline '
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
