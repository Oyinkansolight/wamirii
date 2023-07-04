import Image from 'next/image';
import { useContext } from 'react';

import { UserContext } from '@/components/layout/GetAuthStatus';
import TabBar from '@/components/layout/TabBar';
import UserMiniProfile from '@/components/profile/UserMiniProfile';

export default function VolunteerHeader({
  idx,
  setIdx,
}: {
  idx: number;
  setIdx: (idx: number) => void;
}) {
  const user = useContext(UserContext);
  return (
    <div className='flex items-center justify-between py-6'>
      <Image width={70} height={70} src='/images/logo.png' alt='' />
      <div className='flex-1' />
      <TabBar
        items={[
          { label: 'My Statistics' },
          { label: 'My Submissions' },
          { label: 'All Submissions' },
          { label: 'Found Persons' },
        ]}
        currentIdx={idx}
        onChange={setIdx}
        inactiveItemClassName='border-transparent'
      />
      <UserMiniProfile user={user} />
    </div>
  );
}
