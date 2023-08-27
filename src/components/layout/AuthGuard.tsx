import { useRouter } from 'next/router';
import { useContext } from 'react';

import Button from '@/components/buttons/Button';
import Loading from '@/components/generic/Loading';
import {
  AuthStatusContext,
  UserContext,
} from '@/components/layout/GetAuthStatus';

import { roles } from '@/constant/generic';

export default function AuthGuard({
  children,
  role,
}: {
  children: JSX.Element;
  role?: (typeof roles)[number][];
}) {
  const authStatus = useContext(AuthStatusContext);
  const user = useContext(UserContext);
  const router = useRouter();
  if (authStatus === 'logged-out') {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <div>You must be logged in to view this page</div>
        <Button
          onClick={() => {
            router.push('/?auth=0');
          }}
        >
          Login Here
        </Button>
      </div>
    );
  }

  if (authStatus === 'loading' || !user?.role) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <Loading />
      </div>
    );
  }
  if (role && !role.includes(user?.role ?? 'user')) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <div>You do not have permission to view this page</div>
        <Button
          onClick={() => {
            router.push(`/${user.role ?? 'user'}`);
          }}
        >
          Home
        </Button>
      </div>
    );
  }
  return <>{children}</>;
}
