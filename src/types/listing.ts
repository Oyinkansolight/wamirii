import { Timestamp } from 'firebase/firestore';

export class Listing {
  createdBy?: string;
  person?: MissingPerson;
  contact?: Contact;
  reporter?: ReporterInformation;
  createdAt?: Timestamp;
}

class MissingPerson {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  gender?: 'male' | 'female';
  age?: number;
  missingSince?: Timestamp;
  occupation?: string;
  lastSeenState?: string;
  dateReported?: Timestamp;
  moreInformation?: string;
}

class Contact {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

class ReporterInformation {
  name?: string;
  email?: string;
  phone?: string;
  relationship?: string;
}
