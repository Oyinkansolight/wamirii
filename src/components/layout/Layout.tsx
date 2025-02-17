import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Nav from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <div className='flex flex-col overflow-x-hidden overflow-y-scroll'>
        <Nav />
        {children}
      </div>

      <Footer />
    </>
  );
}
