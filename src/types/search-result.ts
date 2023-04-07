export interface SearchHit {
  path?: string;
  missingFirstName?: string;
  missingLastName?: string;
  missingAge?: string;
  missingOccupation?: string;
  missingLastSeenSate?: string;
  missingSince?: number;
  missingImageUrl?: string;
  lastmodified?: number;
  objectID?: string;
  _highlightResult?: HighlightResult;
  __position?: number;
}

export interface HighlightResult {
  path?: Lastmodified;
  missingFirstName?: Lastmodified;
  missingLastName?: Lastmodified;
  missingAge?: Lastmodified;
  missingOccupation?: Lastmodified;
  missingLastSeenSate?: Lastmodified;
  missingSince?: Lastmodified;
  missingImageUrl?: Lastmodified;
  lastmodified?: Lastmodified;
}

export interface Lastmodified {
  value?: string;
  matchLevel?: string;
  matchedWords?: string[];
  fullyHighlighted?: boolean;
}
