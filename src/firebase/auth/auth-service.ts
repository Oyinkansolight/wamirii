import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import logger from '@/lib/logger';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import { auth } from '@/firebase/init';

export class AuthService {
  static async signUpWithEmail(
    email: string,
    password: string,
    username?: string
  ): Promise<void> {
    try {
      const u = await createUserWithEmailAndPassword(auth, email, password);
      FirestoreService.createNewUserDocument(u.user.uid, email, username);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw { message: this.getErrorMessage(error.code), code: error.code };
    }
  }

  static async signInWithEmail(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw { message: this.getErrorMessage(error.code), code: error.code };
    }
  }

  static async signOut() {
    return await signOut(auth);
  }

  private static getErrorMessage(code: string) {
    switch (code) {
      case 'auth/user-not-found':
        return 'No user with this email address exists. Create account to continue.';
      case 'auth/email-already-in-use':
        return 'This email address is already in use';
      default:
        logger(code);
        return 'Unknown error';
    }
  }
}
