import { Timestamp } from 'firebase/firestore';

export class Listing {
  person?: MissingPerson;
  contact?: Contact;
  reporter?: ReporterInformation;
}

class MissingPerson {
  createdBy?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  gender?: 'male' | 'female';
  age?: number;
  missingSince?: Timestamp;
  createdAt?: Timestamp;
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
