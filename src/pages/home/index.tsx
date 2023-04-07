import { useContext } from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';

import { AuthService } from '@/firebase/auth/auth-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  return (
    <DashboardLayout>
      <div className='flex h-screen flex-col items-center justify-center'>
        {user && <div> Logged in as {user.username}</div>}
        <div>
          <button
            onClick={async () => {
              await AuthService.signOut();
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
});
