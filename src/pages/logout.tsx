import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AuthService } from '@/firebase/auth/auth-service';

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    AuthService.signOut();
    router.push('/');
  }, [router]);

  return <div></div>;
}
