import { Timestamp } from 'firebase/firestore';

export interface FilterListings {
  missingGender: 'male' | 'female' | null;
  ageFrom: number | null;
  ageTo: number | null;
  missingSinceFrom: Timestamp | null;
  missingSinceTo: Timestamp | null;
  dateReportedFrom: Timestamp | null;
  dateReportedTo: Timestamp | null;
  missingOccupation: Timestamp | null;
}
