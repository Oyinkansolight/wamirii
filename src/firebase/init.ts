// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

import { firebaseConfig } from '@/constant/env';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBISBfDPTdwbDYzn1mKznbnBzOUJrxM6no',
//   authDomain: 'wamirii.firebaseapp.com',
//   projectId: 'wamirii',
//   storageBucket: 'wamirii.appspot.com',
//   messagingSenderId: '1024495080366',
//   appId: '1:1024495080366:web:b5b30019294ac27038ae3f',
//   measurementId: 'G-J3PT36LXB3',
// };

// const firebaseStagingConfig = {
//   apiKey: 'AIzaSyCYdhlSI_unFxqw2ambWtaclps-KbPNqNg',
//   authDomain: 'wamirii-staging.firebaseapp.com',
//   projectId: 'wamirii-staging',
//   storageBucket: 'wamirii-staging.appspot.com',
//   messagingSenderId: '1056519370167',
//   appId: '1:1056519370167:web:b1de1ce64551da4fe96432',
//   measurementId: 'G-HNX08FFPT8',
// };

// console.log(`Is Staging: ${isStaging}`);

// Initialize Firebase
const app: FirebaseApp | undefined = initializeApp(firebaseConfig);

// if (isStaging !== undefined && isStaging === true) {
//   console.log('This is Staging');
//   app = initializeApp(firebaseStagingConfig);
// }
// if (isStaging !== undefined && isStaging === false) {
//   console.log('This is Production');
//   app = initializeApp(firebaseConfig);
// }

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
