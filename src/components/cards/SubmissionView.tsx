import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { IoMdClose } from 'react-icons/io';

import clsxm from '@/lib/clsxm';

import Loading from '@/components/generic/Loading';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import { StorageService } from '@/firebase/storage/storage-service';
import GetDocumentHOC from '@/hocs/get-document';

import { Listing, Status } from '@/types/listing';
import { User } from '@/types/user';

export const ListingCardFromId2 = ({ listingId }: { listingId: string }) => {
  const [listing] = useDocument(
    FirestoreService.getDocRef(`listings/${listingId}`)
  );
  return <SubmissionView listing={{ ...listing?.data(), _id: listing?.id }} />;
};

const SubmissionView = ({
  listing,
  className,
  onClick,
  onClose,
  size = 'lg',
  fromAlgolia = false,
}: {
  listing?: Listing;
  size?: 'sm' | 'lg';
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
  fromAlgolia?: boolean;
}) => {
  const [url] = useDownloadURL(StorageService.getRef(listing?.missingImageUrl));

  const name =
    listing?.missingFirstName || listing?.missingLastName
      ? `${listing?.missingLastName} ${listing?.missingFirstName}`
      : listing?._id;

  const avatar = createAvatar(initials, {
    seed: name ?? 'NO',
    // fontFamily: ['Arial'],
  });

  const Author = listing?.createdBy
    ? GetDocumentHOC((props) => {
        return <div>{(props.doc as User).username}</div>;
      }, `users/${listing?.createdBy}`)
    : () => <div>Author [NULL]</div>;

  return (
    <div
      className={clsxm(
        'relative flex w-full gap-8 overflow-hidden bg-white text-start',
        size === 'sm' ? 'text-xs' : 'text-base',
        className
      )}
      onClick={onClick}
    >
      <div
        style={{
          aspectRatio: 0.85341,
          width: '20rem',
          position: 'relative',
        }}
        className='overflow-hidden rounded-lg'
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
              `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`
            }`}
            className='h-64 w-full object-cover transition-all duration-300 ease-in hover:scale-110'
            alt=''
          />
        )}
      </div>
      <div className='flex-1'>
        <div className='flex justify-end'>
          <div
            onClick={onClose}
            className='cursor-pointer rounded-full bg-[#D2E1D7] p-1 text-[#042614]'
          >
            <IoMdClose />
          </div>
        </div>
        <div
          aria-label='Name'
          className={clsxm(
            ' mb-3 inline-block font-bold leading-5 transition-colors duration-200 hover:text-primary',
            size === 'sm' ? 'text-base' : 'text-3xl'
          )}
        >
          {name}
        </div>

        <div className='text-[#13602C]'>
          {listing?.missingGender === 'male' ? 'Male' : 'Female'}{' '}
          <span className='text-[#DCEBE3]'>|</span> {listing?.missingAge} Years
        </div>
        <div
          className={clsxm(
            'grid grid-cols-2 gap-y-2 gap-x-16 font-bold',
            size === 'sm' ? 'gap-x-10' : ''
          )}
        >
          <div className=''>
            <div className='font-normal text-[#04261466]'>Missing Since</div>
            <div>
              {listing?.missingSince && (
                <span>
                  {fromAlgolia
                    ? moment(listing?.missingSince as unknown as number).format(
                        'DD/MMM/YYYY'
                      )
                    : moment(listing?.missingSince?.toDate()).format(
                        'DD/MMM/YYYY'
                      )}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className='font-normal text-[#04261466]'>Last Seen State</div>
            <div>{listing?.missingLastSeenSate}</div>
          </div>
          <div>
            <div className='font-normal text-[#04261466]'>Occupation</div>
            <div>{listing?.missingOccupation}</div>
          </div>
          <div>
            <div className='font-normal text-[#04261466]'>Reported</div>
            <Author />
          </div>
        </div>
        <div className='h-8' />
        <div className=' border border-[#D9EFE1] bg-[#F4FFF8] p-6'>
          <div className='flex'>
            <div className='rounded bg-[#DFFAE7] py-1 px-3 text-[#13602C]'>
              Contact Information If Found
            </div>
          </div>
          <div className='h-4' />
          <div className='grid grid-cols-3 gap-5'>
            <Item label='Name' text={listing?.contactName ?? '[NULL]'} />
            <Item
              label='Email Address'
              text={listing?.contactEmail ?? '[NULL]'}
            />
            <Item
              label='Phone Number'
              text={listing?.contactPhone ?? '[NULL]'}
            />
            <Item label='Address' text={listing?.contactAddress ?? '[NULL]'} />
            <Item
              label='Relationship'
              text={listing?.contactRelationship ?? '[NULL]'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export function Status({ status }: { status: Status }) {
  return (
    <div className='rounded-full bg-green-500 px-4 py-1 capitalize text-white'>
      {status}
    </div>
  );
}

function Item({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className='text-[#04261466]'>{label}</div>
      <div className='text-[#042614]'>{text}</div>
    </div>
  );
}

export default SubmissionView;
