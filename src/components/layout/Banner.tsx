import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Hits, useSearchBox } from 'react-instantsearch-hooks-web';

import SearchResultCard from '@/components/submissions/SearchResultCard';

const Banner = () => {
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const { refine } = useSearchBox();
  const [showHits, setShowHits] = useState(false);
  return (
    <div className='relative w-full'>
      <Image
        width={1260}
        height={750}
        src='https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&amp;h=750&amp;w=1260'
        className='absolute inset-0 h-full w-full object-cover'
        alt=''
      />
      <div className='relative bg-primary-600 bg-opacity-75'>
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
                Wamirii Initiative
              </h2>
              <p className='mb-4 max-w-xl text-base text-primary-50 md:text-lg'>
                National database for missing persons in Nigeria.
              </p>
            </div>
            <div className='w-full max-w-xl xl:w-5/12 xl:px-8'>
              <div className='rounded bg-white p-7 shadow-2xl sm:p-10'>
                <h3 className='mb-4 text-xl font-semibold sm:mb-6 sm:text-center sm:text-2xl'>
                  Who are you looking for?
                </h3>
                <form
                  onSubmit={(v) => {
                    v.preventDefault();
                    router.push(
                      `/submissions-search-results?search=${searchString}`
                    );
                  }}
                >
                  <div className='mb-1 sm:mb-2'>
                    <input
                      placeholder='Search for name, location or age'
                      onChange={(v) => {
                        const t = v.currentTarget.value;
                        if (!t || t === '') {
                          setShowHits(false);
                        } else {
                          refine(t);
                          setShowHits(true);
                          setSearchString(t);
                        }
                      }}
                      required
                      type='text'
                      id='search'
                      autoComplete='off'
                      name='missing_search'
                      className='focus:shadow-outline mb-2 h-12 w-full flex-grow appearance-none rounded border border-gray-300 bg-white px-4 shadow-sm transition duration-200 focus:border-primary-400 focus:outline-none'
                    />
                    <div className='relative'>
                      <Hits
                        hidden={!showHits}
                        className='absolute z-auto w-full rounded-md bg-white shadow-lg'
                        classNames={{ list: 'space-y-1' }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        hitComponent={(props: any) => {
                          return <SearchResultCard hit={props.hit} />;
                        }}
                      />
                    </div>
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
