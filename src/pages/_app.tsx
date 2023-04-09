import { Analytics } from '@vercel/analytics/react';
import algoliasearch from 'algoliasearch/lite';
import { AppProps } from 'next/app';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import GetAuthStatus from '@/components/layout/GetAuthStatus';

const searchClient = algoliasearch(
  'MCZ2828J1K',
  'ff7b732a9e37807e283303b3ae230397'
);

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName='wamirii_firestore'>
        <GetAuthStatus>
          <Component {...pageProps} />
        </GetAuthStatus>
      </InstantSearch>
      <ToastContainer />
      <Analytics />
    </>
  );
}

export default MyApp;
