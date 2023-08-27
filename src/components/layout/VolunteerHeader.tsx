import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext } from '@/components/layout/GetAuthStatus';
import TabBar from '@/components/layout/TabBar';
import UserMiniProfile from '@/components/profile/UserMiniProfile';

export default function VolunteerHeader({
  idx,
  setIdx,
  onProfileClicked,
}: {
  idx: number;
  setIdx: (idx: number) => void;
  onProfileClicked: () => void;
}) {
  const user = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (idx === 2) {
      router.push('/submissions');
    }
  }, [idx, router]);

  return (
    <div className='flex items-center justify-between py-6'>
      <Link href='/'>
        <Image width={70} height={70} src='/images/logo.png' alt='' />
      </Link>
      <div className='flex-1' />
      <TabBar
        items={[
          { label: 'Statistics' },
          { label: 'My Submissions' },
          { label: 'All Submissions' },
          { label: 'Found Persons' },
        ]}
        currentIdx={idx}
        onChange={setIdx}
        inactiveItemClassName='border-transparent'
      />
      <UserMiniProfile onClick={onProfileClicked} user={user} />
    </div>
  );
}
