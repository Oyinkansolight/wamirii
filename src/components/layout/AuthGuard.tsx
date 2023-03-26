import { onAuthStateChanged } from 'firebase/auth';
import { Unsubscribe } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { createContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import { auth } from '@/firebase/init';

import { User } from '@/types/user';

export const UserContext = createContext<User | null>(null);

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const count = useRef(0);
  const [user, setUser] = useState<User | null>(null);
  createContext;
  const router = useRouter();
  useEffect(() => {
    let unsubscribe2: Unsubscribe | undefined;
    const unsubscribe = onAuthStateChanged(
      auth,
      async (u) => {
        if (count.current > 0) {
          if (!u) {
            setUser(null);
            toast.warn(
              <div>
                <div>You must be logged in to view this page</div>
                <button
                  className='rounded-md bg-green-300 px-4 py-1'
                  onClick={() => router.push('/?auth=0')}
                >
                  Log In
                </button>
              </div>,
              { autoClose: false }
            );
          } else {
            unsubscribe2 = await FirestoreService.getUserDoc(u.uid, (data) => {
              setUser(data);
            });
          }
        }
        count.current += 1;
      },
      (error) => {
        toast.error(error.message);
      }
    );
    return () => {
      unsubscribe();
      if (unsubscribe2) unsubscribe2();
    };
  }, [router]);
  return (
    <>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </>
  );
}
