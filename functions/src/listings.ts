/* eslint-disable @typescript-eslint/no-var-requires */
// import {
//   getFirestore,
//   QueryDocumentSnapshot,
//   Timestamp,
// } from 'firebase-admin/firestore';
import moment from 'moment';

//refactor imports to use require
const {
  getFirestore,
  QueryDocumentSnapshot,
  Timestamp,
} = require('firebase-admin/firestore');

type OpType = 'set' | 'delete';

export async function groupListing(
  doc: typeof QueryDocumentSnapshot,
  op: OpType
) {
  const createdBy = doc.data().createdBy as string;
  const createdAt = moment((doc.data().createdAt as typeof Timestamp).toDate());
  const format = createdAt.format('Do MMMM YYYY');
  const firestore = getFirestore();
  if (!(await firestore.doc(`listings-by-date/${format}`).get()).exists) {
    await firestore.doc(`listings-by-date/${format}`).set({
      date: Timestamp.fromDate(dateFloor(createdAt.toDate())),
      format: format,
    });
  }
  if (op === 'set') {
    await firestore
      .doc(`listings-by-date/${format}/listings/${doc.ref.id}`)
      .set(doc.data(), { merge: true });
  } else {
    await firestore
      .doc(`listings-by-date/${format}/listings/${doc.ref.id}`)
      .delete();
    if (
      (await firestore.collection(`listings-by-date/${format}/listings`).get())
        .docs.length === 0
    ) {
      await firestore.doc(`listings-by-date/${format}`).delete();
    }
  }
  await firestore.doc(`listings-by-date/${format}/users/${createdBy}`).set(
    {
      submissionsCount: (
        await firestore
          .collection(`listings-by-date/${format}/listings`)
          .where('createdBy', '==', createdBy)
          .count()
          .get()
      ).data().count,
    },
    { merge: true }
  );
  return 0;
}

function dateFloor(date: Date) {
  const d = moment(date);
  d.hours(0);
  d.minutes(0);
  d.seconds(0);
  d.milliseconds(0);
  return d.toDate();
}
