import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import { StorageService } from '@/firebase/storage/storage-service';

import { Listing } from '@/types/listing';

const ListingCard = ({ listing }: { listing: Listing }) => {
  const [url] = useDownloadURL(StorageService.getRef(listing?.missingImageUrl));
  return (
    <div className='min-w-[400px] overflow-hidden rounded bg-white shadow-sm transition-shadow duration-300'>
      <Image
        width={1260}
        height={750}
        src={`${
          url ??
          'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&amp;w=500'
        }`}
        className='h-64 w-full object-cover transition-all duration-500 ease-in hover:h-96'
        alt=''
      />
      <div className='border border-t-0 p-5'>
        <p className='mb-3 text-xs font-semibold uppercase tracking-wide'>
          <Link
            href='/'
            className='text-blue-gray-900 hover:text-deep-purple-accent-700 transition-colors duration-200'
            aria-label='Missing Person'
            title='Person Name'
          >
            Missing
          </Link>
          <span className='text-gray-600'>— 28 Dec 2020</span>
        </p>
        <Link
          href='/'
          aria-label='Name'
          title='Person Name'
          className='mb-3 inline-block text-2xl font-bold leading-5 transition-colors duration-200 hover:text-primary'
        >
          {listing.missingLastName} {listing.missingFirstName}
        </Link>
        <p className='mb-2 text-gray-700'>Last seen at Yale ave.</p>
        <Link
          href='/'
          aria-label=''
          className='inline-flex items-center text-sm font-semibold text-primary-400 transition-colors duration-200 hover:text-primary-800'
        >
          View more
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
