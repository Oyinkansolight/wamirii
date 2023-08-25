import { collection, query, Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { useMemo } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { BiChevronRight } from 'react-icons/bi';

import TextInput from '@/components/inputs/text-input';
import ProfilePicture from '@/components/profile/ProfilePicture';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import { db } from '@/firebase/init';

import { User } from '@/types/user';

export default function VolunteerSubmissionByDate() {
  const [dates] = useCollection(query(collection(db, 'listings-by-date')));

  return (
    <div className='flex flex-col gap-3 rounded-lg border border-dashed bg-[#EDF3F0] p-4'>
      <div className='flex items-center justify-between'>
        <div className='font-bold'>Submissions</div>
        <TextInput type='date' />
      </div>
      {dates?.docs.map((v, i) => (
        <RenderGroupedDate
          key={i}
          date={v.id}
          dateFormat={moment((v.data().date as Timestamp).toDate()).format(
            'DD/M/YYYY'
          )}
        />
      ))}
    </div>
  );
}

export function RenderGroupedDate({
  date,
  dateFormat,
}: {
  date: string;
  dateFormat: string;
}) {
  const [data] = useCollection(
    query(collection(db, `listings-by-date/${date}/users`))
  );
  return (
    <div>
      <div className='font-bold'>{dateFormat}</div>
      <div className='h-2' />
      {data?.docs.map((v, i) => {
        return (
          <SingleSubmissionListItem
            key={i}
            userId={`users/${v.id}`}
            count={v.data().submissionsCount}
          />
        );
      })}
    </div>
  );
}

function SingleSubmissionListItem({
  userId,
  count,
}: {
  userId: string;
  count: number;
}) {
  const [data] = useDocument(FirestoreService.getDocRef(userId));
  const user = useMemo(
    () => ({ id: data?.id, ...data?.data() } as User),
    [data]
  );
  return (
    <div className='flex gap-4 rounded-md bg-white p-4 shadow'>
      <ProfilePicture className='rounded-lg' user={user} />
      <div className='flex-1'>
        <div className=' font-bold'>{user.username}</div>
        <div className='text-[#04261499]'>{count} Submissions</div>
      </div>
      <div className='flex items-center'>
        <BiChevronRight className='h-14 w-14 text-[#13602C66]' />
      </div>
    </div>
  );
}
