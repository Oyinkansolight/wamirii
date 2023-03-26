import * as React from 'react';

import { ListingCard } from '@/components/cards';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

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
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle='Wamirii Listings' />

      <div className='mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20'>
        <div className='grid gap-8 sm:mx-auto sm:max-w-sm lg:max-w-full lg:grid-cols-3'>
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </div>
      </div>
    </Layout>
  );
}
