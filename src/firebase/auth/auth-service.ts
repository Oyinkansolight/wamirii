import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import { auth } from '@/firebase/init';

export class AuthService {
  static async signUpWithEmail(
    email: string,
    password: string,
    username?: string
  ): Promise<void> {
    const u = await createUserWithEmailAndPassword(auth, email, password);
    FirestoreService.createNewUserDocument(u.user.uid, email, username);
  }

  static async signInWithEmail(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  static async signOut() {
    return await signOut(auth);
  }
}
