import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useContext, useState } from 'react';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import {
  AuthStatusContext,
  UserContext,
} from '@/components/layout/GetAuthStatus';
import ProfilePicture from '@/components/profile/ProfilePicture';

import { AuthService } from '@/firebase/auth/auth-service';

const links = [
  { href: '/', label: 'Home' },
  { href: '/submissions', label: 'Submissions' },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const status = useContext(AuthStatusContext);
  const user = useContext(UserContext);
  return (
    <div
      className={clsxm(!isMenuOpen ? 'py-5' : 'w-full', 'layout z-10 mx-auto')}
    >
      <div className='relative flex items-center'>
        <div className='flex items-center'>
          <Link
            href='/'
            aria-label='Wamirii'
            title='Wamirii'
            className='mr-8 inline-flex items-center'
          >
            <Image
              width={100}
              height={50}
              alt='Wamirii Logo'
              src='/images/logo.png'
            />
          </Link>
          <ul className='hidden items-center space-x-8 lg:flex'>
            {links.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  title={link.label}
                  className='hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-1' />
        {status === 'logged-in' ? (
          <>
            <div
              className='hidden cursor-pointer items-center gap-x-4 lg:flex'
              onClick={() => router.push('/home')}
            >
              <ProfilePicture user={user} />
              <div className='font-bold text-primary'>
                {user?.username}
              </div>{' '}
            </div>

            <div className='ml-4 hidden md:block'>
              <Link
                href={user?.role === 'admin' ? '/admin' : '/home'}
                aria-label='Dashboard'
                title='Dashboard'
                className='hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
              >
                Dashboard
              </Link>
            </div>

            <Button
              className='ml-10 hidden lg:block'
              onClick={() => AuthService.signOut()}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <ul className='hidden items-center space-x-8 lg:flex'>
            <li>
              <Button
                onClick={() => router.push('/auth/login')}
                className='h-12'
                variant='ghost'
              >
                Sign In
              </Button>
            </li>
            <li>
              <Button
                onClick={() => router.push('/auth/register')}
                className='focus:shadow-outline inline-flex h-12 items-center justify-center rounded bg-primary px-6 font-medium tracking-wide text-white shadow-md transition duration-200 hover:bg-primary-600 focus:outline-none'
              >
                Report a missing Person
              </Button>
            </li>
          </ul>
        )}
        {status === 'logged-in' && (
          <div
            className='flex cursor-pointer items-center gap-x-4 lg:hidden'
            onClick={() => router.push('/home')}
          >
            <div className='mr-4 font-bold text-primary'>{user?.username}</div>{' '}
          </div>
        )}
        <div className='lg:hidden'>
          <button
            aria-label='Open Menu'
            title='Open Menu'
            className='focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50 -mr-1 rounded p-2 transition duration-200 focus:outline-none'
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z'
              />
              <path
                fill='currentColor'
                d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z'
              />
              <path
                fill='currentColor'
                d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z'
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className='absolute top-0 left-0 w-full'>
              <div className='rounded border bg-white p-5 shadow-sm'>
                <div className='mb-4 flex items-center justify-between'>
                  <div>
                    <Link
                      href='/'
                      aria-label='Wamirii'
                      title='Wamirii'
                      className='mr-8 inline-flex items-center'
                    >
                      <Image
                        width={100}
                        height={50}
                        alt='Wamirii Logo'
                        src='/images/logo.png'
                      />
                      <span className='ml-2 text-xl font-bold uppercase tracking-wide text-gray-800'>
                        Wamirii
                      </span>
                    </Link>
                  </div>

                  <div>
                    <button
                      aria-label='Close Menu'
                      title='Close Menu'
                      className='focus:shadow-outline -mt-2 -mr-2 rounded p-2 transition duration-200 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                        <path
                          fill='currentColor'
                          d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className='space-y-4'>
                    {links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          aria-label='Our product'
                          title='Our product'
                          className='hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    {status === 'logged-in' && (
                      <li>
                        <Link
                          href='/home'
                          aria-label='Our product'
                          title='Our product'
                          className='hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {status === 'logged-in' ? (
                      <Button onClick={() => AuthService.signOut()}>
                        Sign Out
                      </Button>
                    ) : (
                      <div className='flex flex-col gap-y-4'>
                        <div className='lg:hidden'>
                          <div
                            onClick={() => router.push('/auth/login')}
                            className='hover:text-deep-purple-accent-400 cursor-pointer font-medium tracking-wide text-gray-700 transition-colors duration-200'
                          >
                            Sign In
                          </div>
                        </div>

                        <Button
                          onClick={() => router.push('/auth/register')}
                          className='focus:shadow-outline inline-flex h-8 items-center justify-center rounded bg-primary px-4 font-medium tracking-wide text-white shadow-md transition duration-200 hover:bg-primary-600 focus:outline-none'
                        >
                          Report a missing Person
                        </Button>
                      </div>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
