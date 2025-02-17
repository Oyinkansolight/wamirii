import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='relative mt-16 w-full bg-gray-100'>
      <svg
        className='absolute top-0 -mt-5 h-6 w-full text-gray-100 sm:-mt-10 sm:h-16'
        preserveAspectRatio='none'
        viewBox='0 0 1440 54'
      >
        <path
          fill='currentColor'
          d='M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z'
        />
      </svg>
      <div className='mx-auto px-4 pt-12 text-center sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8'>
        <div className='mb-8'>
          <div className=''>
            <Link
              href='/'
              aria-label='Go home'
              title='Company'
              className='inline-flex items-center'
            >
              <Image
                width={100}
                height={50}
                alt='Wamirii Logo'
                src='/images/logo.png'
              />
              <span className='ml-2 text-xl font-bold uppercase tracking-wide text-black'>
                Wamirii
              </span>
            </Link>
            <div className='mt-4'>
              <p className='text-deep-purple-50 text-sm'>
                The Wamiri Initiative is a non-profit organization that is
                dedicated to creating a comprehensive database of missing
                persons in Nigeria. We are driven by a deep sense of compassion
                for the families and loved ones of missing persons, and
                committed to working tirelessly to help bring these missing
                persons home.
              </p>

              {/* <ul className='mt-2 space-y-2'>
                <li>
                  <Link
                    href='/'
                    className='text-primary hover:text-teal-accent-400 transition-colors duration-300'
                  >
                    News
                  </Link>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
        <div className='border-deep-purple-accent-200 flex flex-col justify-between border-t pt-5 pb-10 sm:flex-row'>
          <p className='text-sm'>
            © Copyright 2023 Wamirii. All rights reserved.
          </p>
          <div className='mx-auto mt-4 flex items-center space-x-4 sm:mt-0 md:mx-0'>
            <Link
              target='_blank'
              href='https://twitter.com/thewamirii'
              className='text-deep-purple-100 hover:text-teal-accent-400 transition-colors duration-300'
            >
              <svg viewBox='0 0 24 24' fill='currentColor' className='h-5'>
                <path d='M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z' />
              </svg>
            </Link>
            <Link
              target='_blank'
              href='https://instagram.com/thewamirii'
              className='text-deep-purple-100 hover:text-teal-accent-400 transition-colors duration-300'
            >
              <svg viewBox='0 0 30 30' fill='currentColor' className='h-6'>
                <circle cx='15' cy='15' r='4' />
                <path d='M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z' />
              </svg>
            </Link>
            <Link
              target='_blank'
              href='https://facebook.com/thewamiri'
              className='text-deep-purple-100 hover:text-teal-accent-400 transition-colors duration-300'
            >
              <svg viewBox='0 0 24 24' fill='currentColor' className='h-5'>
                <path d='M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z' />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
