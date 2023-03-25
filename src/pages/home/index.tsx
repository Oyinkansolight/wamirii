import { useContext } from 'react';

import logger from '@/lib/logger';

import { UserContext } from '@/components/layout/AuthGuard';

import { AuthService } from '@/firebase/auth/auth-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {user && <div> Logged in as {user.username}</div>}
      <div>
        <button
          onClick={async () => {
            logger('Signing out');
            await AuthService.signOut();
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
});
