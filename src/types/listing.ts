import { Timestamp } from 'firebase/firestore';

export class Listing {
  _id?: string;
  createdBy?: string;
  missingFirstName?: string;
  missingLastName?: string;
  missingImageUrl?: string;
  missingGender?: string;
  missingAge?: string;
  missingSince?: Timestamp;
  missingOccupation?: string;
  missingLastSeenSate?: string;
  missingDateReported?: Timestamp;
  missingMoreInformation?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  reporterName?: string;
  reporterEmail?: string;
  reporterPhone?: string;
  reporterRelationship?: string;
  createdAt?: Timestamp;
}
