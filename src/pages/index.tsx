import * as React from 'react';

import { useCollectionInfinite } from '@/hooks/useCollectionInfinite';

import { ListingCard } from '@/components/cards';
import Banner from '@/components/layout/Banner';
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

export default function HomePage() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [listings, isLoading, error] = useCollectionInfinite<Listing>(
    'listings',
    9
  );
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <Banner />

      <div className='mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20'>
        <div className='h3 mb-4'>Recent Submissions</div>
        <div className='grid gap-8 sm:mx-auto sm:max-w-sm lg:max-w-full lg:grid-cols-3'>
          {listings?.map((listing, i) => (
            <ListingCard key={i} listing={listing} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
