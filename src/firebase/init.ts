// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

import { firebaseConfig } from '@/constant/env';

// Initialize Firebase
const app: FirebaseApp | undefined = initializeApp(firebaseConfig);

export { app };
export let analytics: unknown;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth();
export const db = getFirestore();
export const functions = getFunctions(app);
export const storage = getStorage();

if (process.env.LOCAL_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectStorageEmulator(storage, 'localhost', 9199);
}
