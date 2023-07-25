import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'usehooks-ts';

import ListingFoundCard from '@/components/cards/ListingFoundCard';

import { AuthService } from '@/firebase/auth/auth-service';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const params = useSearchParams();
  const [email] = useLocalStorage('change-password-email', '');
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await AuthService.resetPassword(
        params.get('oobCode') ?? '',
        email,
        data.password
      );
      toast.success('Password Changed');
      router.push('/auth/login');
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
              Change Password
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-medium text-gray-900 '
                >
                  Your New Password
                </label>
                <input
                  type='password'
                  {...register('password')}
                  id='password'
                  className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600       sm:text-sm'
                  placeholder='••••••••'
                  required
                />
              </div>
              <button
                disabled={loading}
                type='submit'
                className='w-full rounded bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300   '
              >
                Change Password
              </button>
              <p className='text-sm font-light text-gray-500 '>
                Already have an account{' '}
                <Link
                  href='/auth/login'
                  className='font-medium text-primary hover:underline '
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
