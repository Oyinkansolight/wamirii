import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useContext } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { BiChevronRight } from 'react-icons/bi';

import clsxm from '@/lib/clsxm';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import GetDocumentHOC from '@/hocs/get-document';

import Button from '../buttons/Button';
import { GeneralModalContext } from '../layout/GeneralModalLayout';
import { UserContext } from '../layout/GetAuthStatus';
import DeleteSubmissionView from '../modal-views/DeleteSubmissionView';

import { Listing, Status } from '@/types/listing';
import { User } from '@/types/user';

export const ListingCardFromId2 = ({ listingId }: { listingId: string }) => {
  const [listing] = useDocument(
    FirestoreService.getDocRef(`listings/${listingId}`)
  );
  return <ListingCard2 listing={{ ...listing?.data(), _id: listing?.id }} />;
};

const ListingCard2 = ({
  listing,
  className,
  size = 'lg',
  fromAlgolia = false,
}: {
  listing?: Listing;
  size?: 'sm' | 'lg';
  className?: string;
  fromAlgolia?: boolean;
}) => {
  const router = useRouter();
  const user = useContext(UserContext);
  const m = useContext(GeneralModalContext);
  const name =
    listing?.missingFirstName || listing?.missingLastName
      ? `${listing?.missingLastName} ${listing?.missingFirstName}`
      : listing?._id?.slice(0, 10);

  const avatar = createAvatar(initials, {
    seed: name ?? 'NO',
    // fontFamily: ['Arial'],
  });

  const Author = listing?.createdBy
    ? GetDocumentHOC((props) => {
        return <div>{(props.doc as User).username}</div>;
      }, `users/${listing?.createdBy}`)
    : () => <div>Author [NULL]</div>;

  const deleteListing = useCallback(() => {
    m?.setContent(<DeleteSubmissionView submission={listing} />);
    m?.setIsOpen(true);
  }, [listing, m]);
  const editListing = useCallback(() => {
    router.push(`/manage-submissions/${listing?._id}?mode=edit`);
  }, [listing, router]);

  const createFollowUp = useCallback(() => {
    router.push(`/manage-submissions/${listing?._id}?followUp=create`);
  }, [listing, router]);

  return (
    <div
      className={clsxm(
        'group relative cursor-pointer overflow-hidden bg-white',
        size === 'sm' ? 'text-xs' : 'text-base',
        className
      )}
      onClick={() => router.push(`/submissions/${listing?._id}`)}
    >
      <div
        style={{ aspectRatio: 0.8897, position: 'relative' }}
        className='overflow-hidden rounded-lg'
      >
        <Image
          fill
          src={`${
            listing?.missingImageUrlLink ??
            `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`
          }`}
          className='h-64 w-full object-cover transition-all duration-300 ease-in hover:scale-110'
          alt=''
        />
      </div>
      <div className='h-4' />
      <div
        className={clsxm(
          'grid grid-cols-2 gap-y-2 gap-x-16 font-bold',
          size === 'sm' ? 'gap-x-10' : ''
        )}
      >
        <div
          aria-label='Name'
          className={clsxm(
            ' mb-3 inline-block font-bold leading-5 transition-colors duration-200 hover:text-primary',
            size === 'sm' ? 'text-base' : 'text-2xl'
          )}
        >
          {name}
        </div>

        <div>
          {listing?.missingGender === 'male' ? 'M' : 'F'}{' '}
          <span className='text-[#DCEBE3]'>|</span> {listing?.missingAge} Years
        </div>
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
          <div className='font-normal text-[#04261466]'>Reported</div>
          <Author />
        </div>
        <div className='flex items-end'>
          <div className='flex items-center rounded border border-[#91BC9F] bg-[#DFF5E6] font-normal text-[#13602C]'>
            <div>Read Info</div>
            <BiChevronRight className='h-6 w-6' />
          </div>
        </div>
      </div>
      {(user?.id === listing?.createdBy || user?.role === 'admin') && (
        <div className='absolute left-0 right-0 top-0 flex justify-end gap-2 p-2 opacity-0 transition-all group-hover:opacity-100'>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              createFollowUp();
            }}
          >
            Follow Up
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              editListing();
            }}
          >
            Edit
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteListing();
            }}
          >
            Delete
          </Button>
        </div>
      )}
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

export default ListingCard2;
