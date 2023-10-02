import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { useContext } from 'react';
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';

import { CloseButton } from '@/components/buttons/CloseButton';
import { GeneralModalContext } from '@/components/layout/GeneralModalLayout';
import ProfilePicture from '@/components/profile/ProfilePicture';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

import { Listing } from '@/types/listing';

export default function ViewFollowUpComment({ l }: { l: Listing }) {
  const [data] = useCollectionData(FirestoreService.getFollowUpsQuery(l));
  const g = useContext(GeneralModalContext);

  return (
    <div className='flex h-full flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='text-2xl font-bold'>Comments</div>
        <CloseButton
          onClick={() => {
            if (g) {
              g.setIsOpen(false);
            }
          }}
        />
      </div>
      <div className='flex flex-col gap-4'>
        {data?.map((doc, i) => (
          <CommentListItem key={i} comment={doc as any} />
        ))}
      </div>
    </div>
  );
}

export function ViewSingleFollowUpComment({
  l,
  viewMoreClicked,
}: {
  l: Listing;
  viewMoreClicked: () => void;
}) {
  const [data] = useCollectionData(FirestoreService.getFollowUpsQuery(l, 1));

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <div className='text-lg font-bold'>Comments</div>
        <div className='cursor-pointer' onClick={viewMoreClicked}>
          <HiOutlineArrowLongRight className='h-10 w-10' />
        </div>
      </div>
      <div className='flex flex-col gap-2 rounded border-2 border-[#DAE9E0] bg-[#FDFFFE] p-4'>
        {data?.map((doc, i) => (
          <CommentListItem key={i} comment={doc as any} />
        ))}
      </div>
    </div>
  );
}

export function CommentListItem({
  comment,
}: {
  comment: { comment: string; createdBy: string; createdAt: Timestamp };
}) {
  const [doc] = useDocument(
    FirestoreService.getDocRef(`users/${comment.createdBy}`)
  );
  return (
    <div className='flex gap-2 text-start'>
      <ProfilePicture user={doc?.data()} />
      <div className='flex flex-1 flex-col items-start'>
        <div className='flex w-full justify-between'>
          <div className='font-bold'>{doc?.data()?.username ?? ''}</div>
          <div className='capitalize'>
            {moment(comment.createdAt?.toDate()).fromNow()}
          </div>
        </div>
        <div>{comment.comment}</div>
      </div>
    </div>
  );
}
