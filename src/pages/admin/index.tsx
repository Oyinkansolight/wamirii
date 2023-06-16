import { useContext } from 'react';

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

import MissingPersonsCards from '@/components/charts/MissingPersonsCards';
import RecentSubmissionsTable from '@/components/charts/RecentSubmissionsTable';
import RecentUsersTable from '@/components/charts/RecentUsersTable';
import DashboardLayout2 from '@/components/layout/DashboardLayout2';
import { UserContext } from '@/components/layout/GetAuthStatus';

import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  return (
    <DashboardLayout2>
      <div className='layout flex h-screen flex-col gap-6'>
        <div>
          <div className='text-3xl font-extrabold'>Dashboard</div>
          <div className='font-light text-[#819289]'>
            Welcome {user?.username}, have an in-depth look at the metrics of
            Wamirii.{' '}
          </div>
        </div>
        <MissingPersonsCards />
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
}, ['admin']);
