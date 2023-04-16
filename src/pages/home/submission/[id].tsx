import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDownloadURL } from 'react-firebase-hooks/storage';

import useGetSingleSubmission from '@/hooks/useGetSingleSubmission';

import DashboardLayout from '@/components/layout/DashboardLayout';

import { StorageService } from '@/firebase/storage/storage-service';

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

export default function SingleSubmission() {
  const router = useRouter();
  const { id } = router.query;
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [submission, loading, error] = useGetSingleSubmission<Listing>(
    id as string | undefined
  );

  const [url] = useDownloadURL(
    StorageService.getRef(submission?.missingImageUrl)
  );

  const name =
    submission?.missingFirstName || submission?.missingLastName
      ? `${submission?.missingLastName} ${submission?.missingFirstName}`
      : submission?._id;

  const avatar = createAvatar(initials, {
    seed: name ?? 'NO',
    // fontFamily: ['Arial'],
  });

  return (
    <DashboardLayout>
      <section className='bg-white capitalize dark:bg-gray-900'>
        <div className='relative flex'>
          <div className='min-h-screen lg:w-1/3'></div>
          <div className='hidden min-h-screen w-3/4 bg-gray-100 dark:bg-gray-800 lg:block'></div>

          <div className='container mx-auto flex min-h-screen w-full flex-col justify-center px-6 py-10 lg:absolute lg:inset-x-0'>
            <h1 className='text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl'>
              {submission?.missingFirstName} <br />{' '}
              <span className='text-primary-500'>
                {submission?.missingLastName}
              </span>
              <span>, </span>
              <span>{submission?.missingAge}</span>
            </h1>

            <div className='mt-10 lg:mt-20 lg:flex lg:items-center'>
              <Image
                width={880}
                height={96}
                alt='person'
                src={`${
                  url ??
                  `data:image/svg+xml;utf8,${encodeURIComponent(
                    avatar.toString()
                  )}`
                }`}
                className='h-96 w-full rounded-lg object-cover object-center lg:w-[32rem]'
              />

              <div className='mt-8 lg:mt-0 lg:px-10'>
                <h1 className='whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white lg:w-72'>
                  Missing Since:{' '}
                  <span>
                    {moment(submission?.missingSince?.toDate()).format(
                      'ddd, DD/MMM/YYYY'
                    )}
                  </span>
                </h1>

                <p className='mt-6 max-w-lg text-gray-500 dark:text-gray-400'>
                  “
                  {submission?.missingMoreInformation ??
                    'No additional information'}
                  ”
                </p>
                <div className='h-10' />
                <div>
                  <span className='font-bold text-primary-500'>
                    Last Seen State
                  </span>
                  : <span>{submission?.missingLastSeenSate}</span>
                </div>
                <div>
                  <span className='font-bold text-primary-500'>
                    {' '}
                    Occupation
                  </span>
                  : <span>{submission?.missingOccupation}</span>
                </div>
                <div>
                  <span className='font-bold text-primary-500'> Gender</span>:{' '}
                  <span>{submission?.missingGender}</span>
                </div>
                <div>
                  <span className='font-bold text-primary-500'>
                    {' '}
                    Date Reported
                  </span>
                  :{' '}
                  <span>{submission?.createdAt?.toDate().toDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
