import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/buttons/Button';

const Banner = () => {
  return (
    <div className='relative'>
      <Image
        width={1260}
        height={750}
        src='https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&amp;h=750&amp;w=1260'
        className='absolute inset-0 h-full w-full object-cover'
        alt=''
      />
      <div className='relative bg-gray-800 bg-opacity-75'>
        <svg
          className='absolute inset-x-0 bottom-0 text-white'
          viewBox='0 0 1160 163'
        >
          <path
            fill='currentColor'
            d='M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z'
          />
        </svg>
        <div className='relative mx-auto overflow-hidden px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20'>
          <div className='flex flex-col items-center justify-between xl:flex-row'>
            <div className='mb-12 w-full max-w-xl xl:mb-0 xl:w-7/12 xl:pr-16'>
              <h2 className='h1 mb-6 tracking-tight text-white'>
                Wamirii <br className='hidden md:block' />
                initiative
              </h2>
              <p className='mb-4 max-w-xl text-base text-gray-200 md:text-lg'>
                National database for missing persons in Nigeria.
              </p>
              <Link
                href='/'
                aria-label=''
                className='hover:text-teal-accent-700 inline-flex items-center font-semibold tracking-wider text-primary-900 transition-colors duration-200'
              >
                Learn more
                <svg
                  className='ml-2 inline-block w-3'
                  fill='currentColor'
                  viewBox='0 0 12 12'
                >
                  <path d='M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z' />
                </svg>
              </Link>
            </div>
            <div className='w-full max-w-xl xl:w-5/12 xl:px-8'>
              <div className='rounded bg-white p-7 shadow-2xl sm:p-10'>
                <h3 className='mb-4 text-xl font-semibold sm:mb-6 sm:text-center sm:text-2xl'>
                  Who are you looking for?
                </h3>
                <form>
                  <div className='mb-1 sm:mb-2'>
                    <label
                      htmlFor='firstName'
                      className='mb-1 inline-block font-medium'
                    >
                      Enter Name
                    </label>
                    <input
                      placeholder='John'
                      required
                      type='text'
                      className='focus:border-deep-purple-accent-400 focus:shadow-outline mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 shadow-sm transition duration-200 focus:outline-none'
                      id='firstName'
                      name='firstName'
                    />
                  </div>
                  <div className='mt-4 mb-2 sm:mb-4'>
                    <Button
                      type='submit'
                      className='inline-flex h-12 w-full items-center justify-center px-6 font-medium tracking-wide text-white transition duration-200'
                    >
                      Search
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
