import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

import { LocalListing, toLocalListings } from '@/types/listing';

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

export default function SingleSubmission({
  submission,
}: {
  submission: LocalListing;
}) {
  const name =
    submission?.missingFirstName || submission?.missingLastName
      ? `${submission?.missingLastName} ${submission?.missingFirstName}`
      : submission?._id;

  const avatar = createAvatar(initials, {
    seed: name ?? 'NO',
    // fontFamily: ['Arial'],
  });

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo
        image={submission.missingImageUrlLink}
        title={name}
        type='profile'
        date={submission.missingSince ?? undefined}
        description={submission.missingMoreInformation}
        templateTitle='Wamirii Single Submission View'
      />

      <section
        itemScope
        itemType='https://schema.org/Person'
        className='bg-white capitalize dark:bg-gray-900'
      >
        <div className='relative flex'>
          <div className='min-h-screen lg:w-1/3'></div>
          <div className='hidden min-h-screen w-3/4 bg-gray-100 dark:bg-gray-800 lg:block'></div>

          <div className='container mx-auto flex min-h-screen w-full flex-col justify-center px-6 py-10 lg:absolute lg:inset-x-0'>
            <h1 className='text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl'>
              <span itemProp='givenName'>{submission?.missingFirstName}</span>{' '}
              <br />{' '}
              <span itemProp='familyName' className='text-primary-500'>
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
                  submission?.missingImageUrlLink ??
                  `data:image/svg+xml;utf8,${encodeURIComponent(
                    avatar.toString()
                  )}`
                }`}
                className='h-96 w-full rounded-lg object-contain object-center lg:w-[20rem]'
              />

              <div className='mt-8 lg:mt-0 lg:px-10'>
                <h1 className='whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white lg:w-72'>
                  Missing Since:{' '}
                  <span>
                    {moment(submission?.missingSince).format(
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
                    {' '}
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
                  <span>
                    {moment(submission?.createdAt).format('ddd, DD/MMM/YYYY')}
                  </span>
                </div>
                <div>
                  <span className='font-bold text-primary-500'>
                    {' '}
                    Reported By
                  </span>
                  : <span>{submission?.contactRelationship ?? 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  submission: LocalListing;
}> = async ({ query }) => {
  const submission = toLocalListings(
    await FirestoreService.getSubmissionById(query['id'] as string)
  );

  return { props: { submission } };
};
