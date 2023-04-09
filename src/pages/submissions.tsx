import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';

import { useCollectionInfinite } from '@/hooks/useCollectionInfinite';

import { ListingCard } from '@/components/cards';
import Loading from '@/components/generic/Loading';
import SearchInput from '@/components/inputs/search-input';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { Listing } from '@/types/listing';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function Submissions() {
  const [searchString, setSearchString] = useState('');
  const router = useRouter();
  const [listings, isLoading, error, loadMore, isLastPage] =
    useCollectionInfinite<Listing>('listings', 5);
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle='Wamirii Submissions' />

      <div className='mx-auto w-full py-6 px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-6'>
        <SearchInput
          value={searchString}
          onChange={setSearchString}
          onSubmit={() =>
            router.push(`/submissions-search-results?search=${searchString}`)
          }
        />
        <div className='h-10' />
        {listings?.length === 0 && (
          <section className='mx-auto w-full overflow-hidden py-4'>
            <div className='container mx-auto px-4'>
              <div className='mx-auto max-w-md text-center'>
                <h2 className='font-heading mb-3 text-2xl font-semibold'>
                  No Submissions
                </h2>
                <p className='mb-7 text-neutral-500'>
                  Sign up or in to create a new submission.
                </p>
              </div>
            </div>
          </section>
        )}

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {listings?.map((listing, i) => (
            <ListingCard key={i} listing={listing} />
          ))}
        </div>
        {isLoading ? (
          <div className='flex items-center'>
            <div>
              <Loading />
            </div>
          </div>
        ) : (
          !isLastPage && (
            <div
              onClick={loadMore}
              className='flex cursor-pointer items-center justify-center p-10 font-bold text-primary underline'
            >
              <div>Load More</div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}
