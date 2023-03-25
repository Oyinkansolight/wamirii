export class User {
  id?: string;
  role?: Role;
  username?: string;
  email?: string;
}

export type Role = 'admin' | 'moderator' | 'visitor';
