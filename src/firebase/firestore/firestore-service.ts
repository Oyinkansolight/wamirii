import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  where,
  WhereFilterOp,
} from 'firebase/firestore';

import { db } from '@/firebase/init';
import { StorageService } from '@/firebase/storage/storage-service';

import { Listing } from '@/types/listing';
import { Role, User } from '@/types/user';

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

  static async createListing(listing: Listing) {
    if (listing?.missingImageUrl) {
      const f = listing.missingImageUrl as unknown as FileList;
      if (f.length > 0) {
        const r = await StorageService.uploadFile(f);
        listing.missingImageUrl = r.ref.fullPath;
      } else {
        listing.missingImageUrl = '';
      }
    }
    return await addDoc(collection(db, 'listings'), {
      ...listing,
      createdAt: serverTimestamp(),
    });
  }

  static async userDocExists(id: string) {
    return (await getDoc(doc(db, `users/${id}`))).exists;
  }

  static getUsersQuery(role?: Role) {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
    if (role) {
      constraints.push(where('role', '==', role));
    }
    return query(collection(db, 'users'), ...constraints);
  }

  static getMyDocsQuery(id: string) {
    return query(
      collection(db, 'listings'),
      where('createdBy', '==', `${id}`),
      orderBy('createdAt', 'desc')
    );
  }

  static getAllDocsQuery() {
    return query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
  }

  static getListings(
    createdBy?: string,
    orderByField?: string,
    filterBy: FilterByField[] = []
  ) {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
    if (createdBy) {
      constraints.push(where('createdBy', '==', createdBy));
    }
    if (orderByField) {
      constraints.push(orderBy(orderByField));
    }
    if (filterBy.length !== 0) {
      for (let i = 0; i < filterBy.length; i++) {
        const f = filterBy[i];
        constraints.push(where(f.fieldName, f.opr, f.fieldValue));
      }
    }
    return query(collection(db, 'listings'), ...constraints);
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

export interface FilterByField {
  fieldName: string;
  fieldValue: string;
  opr: WhereFilterOp;
}
