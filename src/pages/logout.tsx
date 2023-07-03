import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AuthService } from '@/firebase/auth/auth-service';

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    AuthService.signOut();
    router.replace('/');
  }, [router]);

  return <div></div>;
}
