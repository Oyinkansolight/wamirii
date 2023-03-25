import {
  doc,
  FirestoreError,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { db } from '@/firebase/init';

import { User } from '@/types/user';

export class FirestoreService {
  static async createNewUserDocument(
    id: string,
    email?: string,
    username?: string
  ) {
    await setDoc(doc(db, `users/${id}`), {
      id,
      username,
      email,
      role: 'visitor',
      createdAt: serverTimestamp(),
    });
  }

  static async userDocExists(id: string) {
    return (await getDoc(doc(db, `users/${id}`))).exists;
  }

  static async getUserDoc(
    id: string,
    onData: (data: User) => void,
    onError?: (error: FirestoreError) => void
  ) {
    return onSnapshot(
      doc(db, `users/${id}`),
      (snap) => {
        onData(snap.data() as User);
      },
      onError
    );
  }
}
