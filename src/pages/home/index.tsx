import { useRouter } from 'next/router';
import { useContext } from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';

import { AuthService } from '@/firebase/auth/auth-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const router = useRouter();
  return (
    <DashboardLayout>
      <div className='flex h-1/2 flex-col items-center justify-center md:h-screen'>
        {user && <div> Logged in as {user.username}</div>}
        <div>
          <button
            onClick={async () => {
              await AuthService.signOut();
              router.push('/');
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
});
