'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { Unsubscribe } from 'firebase/firestore';
import { createContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import { auth } from '@/firebase/init';

import { User } from '@/types/user';

type AuthStatus = 'logged-in' | 'loading' | 'logged-out';

export const UserContext = createContext<User | null>(null);
export const AuthStatusContext = createContext<AuthStatus>('loading');

export default function GetAuthStatus({ children }: { children: JSX.Element }) {
  const count = useRef(0);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<AuthStatus>('loading');
  createContext;
  useEffect(() => {
    let unsubscribe2: Unsubscribe | undefined;
    let t: NodeJS.Timeout | undefined;

    const unsubscribe = onAuthStateChanged(
      auth,
      async (u) => {
        if (!u) {
          setIsLoggedIn('loading');
          t = setTimeout(() => {
            setIsLoggedIn('logged-out');
            setUser(null);
          }, 1000);
        } else {
          unsubscribe2 = await FirestoreService.getUserDoc(u.uid, (data) => {
            setUser({ ...data, email: u.email ?? undefined });
          });
          setIsLoggedIn('logged-in');
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
      if (t) clearTimeout(t);
    };
  }, []);
  return (
    <>
      <UserContext.Provider value={user}>
        <AuthStatusContext.Provider value={isLoggedIn}>
          {children}
        </AuthStatusContext.Provider>
      </UserContext.Provider>
    </>
  );
}
