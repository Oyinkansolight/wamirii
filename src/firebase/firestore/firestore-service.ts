import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getCountFromServer,
  getDoc,
  onSnapshot,
  orderBy,
  OrderByDirection,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
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
      role: 'volunteer',
      createdAt: serverTimestamp(),
    });
  }

  static getListingsConstraints(listing: Listing) {
    const q: QueryConstraint[] = [];
    const keys = Object.keys(listing) as (keyof Listing)[];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (listing[key]) {
        q.push(where(key, '==', listing[key]));
      }
    }
    return q;
  }

  static getUsersConstraints(user: User) {
    const q: QueryConstraint[] = [];
    const keys = Object.keys(user) as (keyof User)[];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (user[key]) {
        q.push(where(key, '==', user[key]));
      }
    }
    return q;
  }

  static getUsersConstraintsOp(
    key: keyof User,
    op: WhereFilterOp,
    value: unknown
  ) {
    return [where(key, op, value)];
  }

  static async getGenderCount(gender: 'male' | 'female') {
    return await getCountFromServer(
      query(collection(db, 'listings'), where('missingGender', '==', gender))
    );
  }

  static async getUsersCount() {
    return await getCountFromServer(query(collection(db, 'users')));
  }

  static async updateUserDocument(user: User) {
    if (user?.imageURL) {
      const f = user.imageURL as unknown as FileList;
      if (f.length > 0) {
        const r = await StorageService.uploadFile(
          f,
          `profile_images/${user.id}`
        );
        user.imageURL = r.ref.fullPath;
      } else {
        user.imageURL = '';
      }
    }
    await updateDoc(doc(db, `users/${user.id}`), { ...user });
  }

  static async createListing(listing: Listing, submissionId?: string) {
    if (listing?.missingImageUrl) {
      const f = listing.missingImageUrl as unknown as FileList;
      if (f.length > 0 && typeof listing.missingImageUrl !== 'string') {
        const r = await StorageService.uploadFile(f);
        listing.missingImageUrl = r.ref.fullPath;
      } else {
        delete listing.missingImageUrl;
      }
    }
    if (listing?.missingSince) {
      listing.missingSince = Timestamp.fromDate(
        new Date((listing.missingSince as unknown as string) ?? '')
      );
    }
    if (listing?.missingDateReported) {
      listing.missingDateReported = Timestamp.fromDate(
        new Date((listing.missingDateReported as unknown as string) ?? '')
      );
    }
    if (submissionId) {
      return await updateDoc(doc(db, `listings/${submissionId}`), {
        ...listing,
        missingAge: listing.missingAge
          ? Number.parseInt(listing.missingAge)
          : null,
      });
    } else {
      return await addDoc(collection(db, 'listings'), {
        ...listing,
        status: 'active',
        missingAge: listing.missingAge
          ? Number.parseInt(listing.missingAge)
          : null,
        createdAt: serverTimestamp(),
      });
    }
  }

  static async deleteListing(id: string) {
    await deleteDoc(doc(db, `listings/${id}`));
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

  static getDateGroup() {
    return query(collection(db, 'listings-by-date'), orderBy('date', 'desc'));
  }

  static getGroupedUsers(group: string, orderByField?: OrderByField) {
    const constraints: QueryConstraint[] = [];
    if (orderByField) {
      constraints.push(orderBy(orderByField.fieldName, orderByField.direction));
    }
    return query(
      collection(db, `listings-by-date/${group}/users`),
      ...constraints
    );
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

  static getDocRef(path: string) {
    return doc(db, path);
  }

  static getListings(
    createdBy?: string,
    orderByField?: OrderByField,
    filterBy: FilterByField[] = []
  ) {
    const field = this.getOrderByField(filterBy);
    const constraints: QueryConstraint[] = [];
    if (createdBy) {
      constraints.push(where('createdBy', '==', createdBy));
    }
    if (!field) {
      if (orderByField) {
        constraints.push(
          orderBy(orderByField.fieldName, orderByField.direction)
        );
      } else {
        constraints.push(orderBy('createdAt', 'desc'));
      }
    } else {
      constraints.push(orderBy(field));
    }
    if (filterBy.length !== 0) {
      for (let i = 0; i < filterBy.length; i++) {
        const f = filterBy[i];
        constraints.push(where(f[0], f[1], f[2]));
      }
    }
    return query(collection(db, 'listings'), ...constraints);
  }

  private static getOrderByField(filters: FilterByField[]): string | null {
    const l: WhereFilterOp[] = ['<', '<=', '!=', 'not-in', '>', '>='];
    for (let i = 0; i < filters.length; i++) {
      const f = filters[i];
      if (l.includes(f[1])) {
        return f[0];
      }
    }
    return null;
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

  static async getUserCountWhere(user: User) {
    const q: QueryConstraint[] = [];
    const keys = Object.keys(user) as (keyof User)[];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (user[key]) {
        q.push(where(key, '==', user[key]));
      }
    }
    return await getCountFromServer(query(collection(db, 'users'), ...q));
  }

  static async getSubmissionCountWhere(submission: Listing) {
    const q: QueryConstraint[] = [];
    const keys = Object.keys(submission) as (keyof Listing)[];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (submission[key]) {
        q.push(where(key, '==', submission[key]));
      }
    }
    return await getCountFromServer(query(collection(db, 'listings'), ...q));
  }
}

export type FilterByField = [string, WhereFilterOp, unknown];

export interface OrderByField {
  fieldName: string;
  direction: OrderByDirection;
}
