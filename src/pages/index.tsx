import * as React from 'react';

import { useCollectionInfinite } from '@/hooks/useCollectionInfinite';

import ListingCard2 from '@/components/cards/ListingCard2';
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
      <Seo title='Wamirii' />

      <Banner />

      <div className='layout py-16'>
        {listings?.length === 0 ? (
          <div className='h3 mb-4 px-4 md:px-0'>No Recent Submissions</div>
        ) : (
          <div className='h3 mb-4 px-4 md:px-0'>Recent Submissions</div>
        )}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {listings?.map((listing, i) => (
            <ListingCard2 key={i} listing={listing} size='sm' />
          ))}
        </div>
      </div>
    </Layout>
  );
}
