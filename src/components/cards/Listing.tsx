import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import Loading from '@/components/generic/Loading';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import { StorageService } from '@/firebase/storage/storage-service';

import { Listing } from '@/types/listing';

export const ListingCardFromId = ({ listingId }: { listingId: string }) => {
  const [listing] = useDocument(
    FirestoreService.getDocRef(`listings/${listingId}`)
  );
  return <ListingCard listing={{ ...listing?.data(), _id: listing?.id }} />;
};

const ListingCard = ({
  listing,
  fromAlgolia = false,
}: {
  listing?: Listing;
  fromAlgolia?: boolean;
}) => {
  const [url] = useDownloadURL(StorageService.getRef(listing?.missingImageUrl));

  const path = `/submissions/${listing?._id}`;

  const name =
    listing?.missingFirstName || listing?.missingLastName
      ? `${listing?.missingLastName} ${listing?.missingFirstName}`
      : listing?._id;

  const avatar = createAvatar(initials, {
    seed: name ?? 'NO',
    // fontFamily: ['Arial'],
  });

  return (
    <div className='w-full overflow-hidden rounded bg-white shadow-sm transition-shadow duration-300'>
      <div className='h-full w-full'>
        <div
          style={{ aspectRatio: 2, position: 'relative' }}
          className='overflow-hidden'
        >
          {!name ? (
            <div className='h-full w-full bg-gray-200' />
          ) : !url && listing?.missingImageUrl ? (
            <div className='flex h-full w-full items-center justify-center'>
              <Loading />
            </div>
          ) : (
            <Image
              fill
              src={`${
                url ??
                `data:image/svg+xml;utf8,${encodeURIComponent(
                  avatar.toString()
                )}`
              }`}
              className='h-64 w-full object-cover transition-all duration-300 ease-in hover:scale-110'
              alt=''
            />
          )}
        </div>
        <div className='h-full border border-t-0 p-5'>
          <p className='mb-3 text-xs font-semibold uppercase tracking-wide'>
            <Link
              href={path}
              className='text-blue-gray-900 hover:text-deep-purple-accent-700 transition-colors duration-200'
              aria-label='Missing Person'
              title='Person Name'
            >
              Missing
            </Link>
            <span className='text-gray-600'>
              <>
                —{' '}
                {listing?.missingSince && (
                  <span>
                    {fromAlgolia
                      ? new Date(
                          listing?.missingSince as unknown as number
                        ).toDateString()
                      : listing?.missingSince?.toDate().toDateString()}
                  </span>
                )}
              </>
            </span>
          </p>
          <Link
            aria-label='Name'
            title='Person Name'
            href={path}
            className='mb-3 inline-block text-2xl font-bold leading-5 transition-colors duration-200 hover:text-primary'
          >
            {listing?.missingLastName} {listing?.missingFirstName}
          </Link>
          <p className='mb-2 text-gray-700'>{listing?.missingLastSeenSate}</p>
          <Link
            href={path}
            aria-label=''
            className='inline-flex items-center text-sm font-semibold text-primary-400 transition-colors duration-200 hover:text-primary-800'
          >
            View more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
