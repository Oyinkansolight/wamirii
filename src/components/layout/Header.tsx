import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import { BasicModal } from '@/components/modals';

const links = [
  { href: '/', label: 'Home' },
  { href: '/listings', label: 'Listings' },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='layout mx-auto py-5'>
      <div className='relative flex items-center justify-between'>
        <div className='flex items-center'>
          <Link
            href='/'
            aria-label='Wamirii'
            title='Wamirii'
            className='mr-8 inline-flex items-center'
          >
            <svg
              className='text-deep-purple-accent-400 w-8'
              viewBox='0 0 24 24'
              strokeLinejoin='round'
              strokeWidth='2'
              strokeLinecap='round'
              strokeMiterlimit='10'
              stroke='currentColor'
              fill='none'
            >
              <rect x='3' y='1' width='7' height='12' />
              <rect x='3' y='17' width='7' height='6' />
              <rect x='14' y='1' width='7' height='6' />
              <rect x='14' y='11' width='7' height='12' />
            </svg>
            <span className='ml-2 text-xl font-bold uppercase tracking-wide text-gray-800'>
              Wamirii
            </span>
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
        <ul className='hidden items-center space-x-8 lg:flex'>
          <li>
            <BasicModal>
              <Button className='focus:shadow-outline inline-flex h-12 items-center justify-center rounded bg-primary px-6 font-medium tracking-wide text-white shadow-md transition duration-200 hover:bg-primary-600 focus:outline-none'>
                Report a missing Person
              </Button>
            </BasicModal>
          </li>
        </ul>
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
                      aria-label='Company'
                      title='Company'
                      className='inline-flex items-center'
                    >
                      <svg
                        className='text-deep-purple-accent-400 w-8'
                        viewBox='0 0 24 24'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeMiterlimit='10'
                        stroke='currentColor'
                        fill='none'
                      >
                        <rect x='3' y='1' width='7' height='12' />
                        <rect x='3' y='17' width='7' height='6' />
                        <rect x='14' y='1' width='7' height='6' />
                        <rect x='14' y='11' width='7' height='12' />
                      </svg>
                      <span className='ml-2 text-xl font-bold uppercase tracking-wide text-gray-800'>
                        Company
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
                    <li>
                      <Link
                        href='/'
                        aria-label='Our product'
                        title='Our product'
                        className='hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                      >
                        Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/'
                        aria-label='Our product'
                        title='Our product'
                        className='hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                      >
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/'
                        aria-label='Product pricing'
                        title='Product pricing'
                        className='hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/'
                        aria-label='About us'
                        title='About us'
                        className='hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                      >
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/'
                        aria-label='Sign in'
                        title='Sign in'
                        className='hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                      >
                        Sign in
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/'
                        className='bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline inline-flex h-12 w-full items-center justify-center rounded px-6 font-medium tracking-wide text-white shadow-md transition duration-200 focus:outline-none'
                        aria-label='Sign up'
                        title='Sign up'
                      >
                        Sign up
                      </Link>
                    </li>
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
