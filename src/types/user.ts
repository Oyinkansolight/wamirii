import { Timestamp } from 'firebase/firestore';

import { roles } from '@/constant/generic';

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

export type Role = (typeof roles)[number];
