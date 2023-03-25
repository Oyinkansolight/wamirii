import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/v1/auth';

admin.initializeApp();

export const onCreateUserHandler = async (user: UserRecord) => {
  admin.firestore().collection('users').doc(user.uid).set({
    role: 'visitor',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};
