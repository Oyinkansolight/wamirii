import Image from 'next/image';
import { useEffect, useState } from 'react';

import clsxm from '@/lib/clsxm';

import RecentVolunteers from '@/components/cards/RecentVolunteers';
import VolunteerSubmissionByDate from '@/components/cards/VolunteerSubmissionByDate';
import DashboardLayout2 from '@/components/layout/DashboardLayout2';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [submissionsCount, setSubmissionsCount] = useState(0);
  const [foundCount, setFoundCount] = useState(0);

  useEffect(() => {
    const run = async () => {
      setVolunteersCount(
        (await FirestoreService.getUserCountWhere({ role: 'volunteer' })).data()
          .count
      );
      setSubmissionsCount(
        (await FirestoreService.getSubmissionCountWhere({})).data().count
      );
      setFoundCount(
        (
          await FirestoreService.getSubmissionCountWhere({
            status: 'found-alive',
          })
        ).data().count +
          (
            await FirestoreService.getSubmissionCountWhere({
              status: 'found-deceased',
            })
          ).data().count
      );
    };
    run();
  }, []);

  return (
    <DashboardLayout2>
      <div>
        <div className='flex justify-between'>
          <TotalVolunteers
            title='Total No of Volunteers'
            count={volunteersCount}
          />
          <TotalVolunteers
            title='Total No of Submissions'
            count={submissionsCount}
            variant={1}
          />
          <TotalVolunteers
            title='Total No of Found Persons'
            count={foundCount}
            variant={2}
          />
        </div>
        <div className='h-12' />
        <div className='grid grid-cols-2 gap-8'>
          <VolunteerSubmissionByDate />
          <RecentVolunteers />
        </div>
      </div>
    </DashboardLayout2>
  );
}, ['manager']);

function TotalVolunteers({
  title,
  count,
  variant = 0,
}: {
  title: string;
  count: number;
  variant?: number;
}) {
  return (
    <div className='flex flex-col justify-start'>
      <div
        className={clsxm(
          'flex items-start gap-4 rounded-lg p-5 pr-20',
          variant === 0 && 'border border-dashed border-[#819289] bg-[#EDF3F0]',
          variant === 1 && 'bg-white shadow',
          variant === 2 && 'bg-[#D7E8DE]'
        )}
      >
        <div className='rounded-lg bg-[#DBF3DB] p-2'>
          {variant === 0 && (
            <Image
              src='/images/avatar.png'
              alt='avatar'
              height={36}
              width={36}
            />
          )}
          {variant === 1 && (
            <Image
              src='/images/folder.png'
              alt='avatar'
              height={36}
              width={36}
            />
          )}
          {variant === 2 && (
            <Image
              src='/images/smiley.png'
              alt='avatar'
              height={36}
              width={36}
            />
          )}
        </div>
        <div>
          <div className='text-xl font-bold'>{title}</div>
          <div className='text-[#819289]'>10% increase from last month</div>
          <div className='h-5' />
          <div className='text-5xl font-bold'>{count.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
