/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
// import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';

// Make the above imports using javascript require import
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

// async function createGlobalDoc() {
//   if ((await admin.firestore().doc('global/global').get()).exists) {
//     return;
//   }
//   await admin.firestore().doc('global/global').set({ totalSubmissions: 0 });
// }

// eslint-disable-next-line unused-imports/no-unused-vars
export const init = functions.https.onRequest(
  async (req: any, res: { json: (arg0: { done: boolean }) => void }) => {
    await admin
      .firestore()
      .doc('global/global')
      .set(
        {
          totalSubmissions: (
            await admin.firestore().collection('listings').count().get()
          ).data().count,
        },
        { merge: true }
      );
    const allDocs = (await admin.firestore().collection('users').get()).docs;
    for (let i = 0; i < allDocs.length; i++) {
      const doc = allDocs[i];
      await doc.ref.update({
        submissionsCount: (
          await admin
            .firestore()
            .collection('listings')
            .where('createdBy', '==', doc.id)
            .count()
            .get()
        ).data().count,
      });
    }
    res.json({ done: true });
    return;
  }
);

export const listingCreated = functions.firestore
  .document('listings/{doc}')
  .onCreate(
    async (changeDoc: {
      data: () => { (): any; new (): any; createdBy: any };
    }) => {
      admin
        .firestore()
        .doc('global/global')
        .set(
          {
            totalSubmissions: (
              await admin.firestore().collection('listings').count().get()
            ).data().count,
          },
          { merge: true }
        );
      const docRef = admin
        .firestore()
        .doc(`users/${changeDoc.data().createdBy}`);
      await docRef.update({
        submissionsCount: (
          await admin
            .firestore()
            .collection('listings')
            .where('createdBy', '==', docRef.id)
            .count()
            .get()
        ).data().count,
      });
    }
  );

export const listingDeleted = functions.firestore
  .document('listings/{doc}')
  .onDelete(
    async (changeDoc: {
      data: () => { (): any; new (): any; createdBy: any };
    }) => {
      admin
        .firestore()
        .doc('global/global')
        .set(
          {
            totalSubmissions: (
              await admin.firestore().collection('listings').count().get()
            ).data().count,
          },
          { merge: true }
        );
      const docRef = admin
        .firestore()
        .doc(`users/${changeDoc.data().createdBy}`);
      await docRef.update({
        submissionsCount: (
          await admin
            .firestore()
            .collection('listings')
            .where('createdBy', '==', docRef.id)
            .count()
            .get()
        ).data().count,
      });
    }
  );
