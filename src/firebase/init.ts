// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const analytics = getAnalytics(app);
