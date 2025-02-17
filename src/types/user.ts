import { Timestamp } from 'firebase/firestore';

import { roles, statuses } from '@/constant/generic';

export class User {
  id?: string;
  role?: Role;
  username?: string;
  acronym?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageURL?: string;
  imageURLLink?: string;
  organizationId?: string;
  submissionsCount?: number;
  createdAt?: Timestamp;
  joinedAt?: Timestamp;
  status?: UserStatus;
  phoneNumber?: string;
}

export type Role = (typeof roles)[number];
export type UserStatus = (typeof statuses)[number];
