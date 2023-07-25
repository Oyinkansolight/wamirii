import { FirebaseError } from 'firebase/app';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  verifyPasswordResetCode,
} from 'firebase/auth';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import { auth } from '@/firebase/init';

export class AuthService {
  static async signUpWithEmail(
    email: string,
    password: string,
    username?: string
  ) {
    try {
      const u = await createUserWithEmailAndPassword(auth, email, password);
      await FirestoreService.createNewUserDocument(u.user.uid, email, username);
      return u;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw { message: this.getErrorMessage(error.code), code: error.code };
    }
  }

  static async signInWithEmail(email: string, password: string) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (await FirestoreService.isUserExists(res.user.uid)) return res;
      FirestoreService.createNewUserDocument(
        res.user.uid,
        res.user.email ?? undefined,
        res.user.email?.split('@')[0]
      );
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw { message: this.getErrorMessage(error.code), code: error.code };
    }
  }

  static async changePassword(
    currentPassword: string,
    newPassword: string,
    email: string
  ) {
    try {
      const userCredential = await this.signInWithEmail(email, currentPassword);
      await updatePassword(userCredential.user, newPassword);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw { message: this.getErrorMessage(error.code), code: error.code };
    }
  }

  static async sendPasswordReset(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  static async resetPassword(code: string, email: string, newPassword: string) {
    try {
      const _email = await verifyPasswordResetCode(auth, code);
      if (_email === email) {
        await confirmPasswordReset(auth, code, newPassword);
      } else {
        throw new FirebaseError('auth/invalid-action-code', '');
      }
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
      case 'auth/wrong-password':
        return 'Incorrect Password';
      case 'auth/email-already-in-use':
        return 'This email address is already in use';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/invalid-action-code':
        return 'Invalid reset code';
      default:
        // eslint-disable-next-line no-console
        console.log(code);
        return 'Unknown error';
    }
  }
}
