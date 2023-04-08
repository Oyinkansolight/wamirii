import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInfiniteHits, useSearchBox } from 'react-instantsearch-hooks-web';

import ListingCard from '@/components/cards/Listing';
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
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const { hits, isLastPage, showMore } = useInfiniteHits({
    showPrevious: true,
  });
  const { refine } = useSearchBox();
  useEffect(() => {
    const s = router.query['search'] as string;
    if (s) setSearchString(s);
  }, [router]);

  useEffect(() => {
    refine(searchString);
  }, [refine, searchString]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle='Wamirii Listings' />

      <div className='mx-auto w-full py-6 px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-6'>
        <SearchInput onChange={setSearchString} value={searchString} />
        <div className='h-10' />
        {hits?.length === 0 && (
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

        <div className='grid gap-8 lg:grid-cols-3'>
          {hits?.map((hit) => {
            const id = hit.objectID;
            const listing = hit as unknown as Listing;
            listing._id = id;
            return <ListingCard fromAlgolia key={id} listing={listing} />;
          })}
        </div>
        {!isLastPage && (
          <div
            onClick={showMore}
            className='flex cursor-pointer items-center justify-center p-10 font-bold text-primary underline'
          >
            <div>Load More</div>
          </div>
        )}
      </div>
    </Layout>
  );
}
