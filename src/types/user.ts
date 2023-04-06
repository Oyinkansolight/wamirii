export class User {
  id?: string;
  role?: Role;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageURL?: string;
}

export type Role = 'admin' | 'moderator' | 'visitor';
