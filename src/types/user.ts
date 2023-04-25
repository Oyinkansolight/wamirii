import { Timestamp } from 'firebase/firestore';

export class User {
  id?: string;
  role?: Role;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageURL?: string;
  submissionsCount?: number;
  createdAt?: Timestamp;
}

export type Role = 'admin' | 'user' | 'organization' | 'manager' | 'volunteer';
