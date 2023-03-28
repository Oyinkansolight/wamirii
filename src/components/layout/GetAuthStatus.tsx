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
    const unsubscribe = onAuthStateChanged(
      auth,
      async (u) => {
        if (count.current > 0) {
          if (!u) {
            setIsLoggedIn('logged-out');
            setUser(null);
          } else {
            unsubscribe2 = await FirestoreService.getUserDoc(u.uid, (data) => {
              setUser(data);
            });
            setIsLoggedIn('logged-in');
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
