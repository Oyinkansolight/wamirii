import { Timestamp } from 'firebase/firestore';

import { status } from '@/constant/generic';

export class Listing {
  _id?: string;
  createdBy?: string;
  missingFirstName?: string;
  missingLastName?: string;
  missingImageUrl?: string;
  missingImageUrlLink?: string;
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
  contactRelationship?: string;
  reporterName?: string;
  reporterEmail?: string;
  reporterPhone?: string;
  createdAt?: Timestamp;
  status?: Status;
  deleted?: boolean;
}

export type Status = (typeof status)[number];

export function toLocalListings(l: Listing) {
  const c = {
    ...l,
    missingSince: l.missingSince?.toDate()?.toISOString() ?? null,
    missingDateReported: l.missingDateReported?.toDate()?.toISOString() ?? null,
    createdAt: l.createdAt?.toDate()?.toISOString() ?? null,
  };
  return c;
}

export type LocalListing = ReturnType<typeof toLocalListings>;
