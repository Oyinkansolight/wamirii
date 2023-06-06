import { useContext } from 'react';

import DashboardInfoCard from '@/components/cards/DashboardInfoCard';
const RegisteredUsersChart = dynamic(
  () => import('../../components/charts/RegisteredUsersChart'),
  { ssr: false }
);
const GenderSubmissionsChart = dynamic(
  () => import('../../components/charts/GenderSubmissionsChart'),
  { ssr: false }
);
const AgeSubmissionsChart = dynamic(
  () => import('../../components/charts/AgeSubmissionsChart'),
  { ssr: false }
);
import dynamic from 'next/dynamic';

import RecentSubmissionsTable from '@/components/charts/RecentSubmissionsTable';
import RecentUsersTable from '@/components/charts/RecentUsersTable';
import DashboardLayout2 from '@/components/layout/DashboardLayout2';
import { UserContext } from '@/components/layout/GetAuthStatus';

import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);

  const s = [
    {
      n: 12002,
      subText: 'Found Persons',
      percent: 10,
    },
    {
      n: 12002,
      subText: 'Total Missing Persons',
      percent: -10,
    },
    {
      n: 12002,
      subText: 'Found Persons',
      percent: 10,
    },
    {
      n: 12002,
      subText: 'Found Persons',
      percent: 10,
    },
  ];
  return (
    <DashboardLayout2>
      <div className='flex h-screen flex-col gap-6'>
        <div>
          <div className='text-3xl font-extrabold'>Dashboard</div>
          <div className='font-light text-[#819289]'>
            Welcome {user?.username}, have an in-depth look at the metrics of
            Wamirii.{' '}
          </div>
        </div>
        <div className='flex justify-between gap-6'>
          {Array(4)
            .fill(0)
            .map((v, i) => (
              <DashboardInfoCard key={i} {...s[i]} variant={i} />
            ))}
        </div>
        <div className='flex justify-between gap-6'>
          <RegisteredUsersChart />
          <GenderSubmissionsChart />
        </div>
        <AgeSubmissionsChart />
        <div className='grid grid-cols-5 justify-between gap-6'>
          <div className='col-span-3'>
            <RecentSubmissionsTable />
          </div>
          <div className='col-span-2'>
            <RecentUsersTable />
          </div>
        </div>
      </div>
    </DashboardLayout2>
  );
});
