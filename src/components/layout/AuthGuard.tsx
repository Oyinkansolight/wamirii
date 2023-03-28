import { useRouter } from 'next/router';
import { useContext } from 'react';

import Button from '@/components/buttons/Button';
import { AuthStatusContext } from '@/components/layout/GetAuthStatus';

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const authStatus = useContext(AuthStatusContext);
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
  return <>{children}</>;
}
