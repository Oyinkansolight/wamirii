// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyBISBfDPTdwbDYzn1mKznbnBzOUJrxM6no',
  authDomain: 'wamirii.firebaseapp.com',
  projectId: 'wamirii',
  storageBucket: 'wamirii.appspot.com',
  messagingSenderId: '1024495080366',
  appId: '1:1024495080366:web:b5b30019294ac27038ae3f',
  measurementId: 'G-J3PT36LXB3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
export const functions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
