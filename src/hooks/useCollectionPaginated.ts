import {
  collection,
  DocumentSnapshot,
  FirestoreError,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
  startAfter,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { OrderByField } from '@/firebase/firestore/firestore-service';
import { db } from '@/firebase/init';

export function useCollectionPaginated(
  collectionPath: string,
  perPage = 5,
  initConstraint?: QueryConstraint
): {
  docs: DocumentSnapshot[] | undefined;
  isLoading: boolean;
  error: FirestoreError | undefined;
  nextPage: () => void;
  previousPage: () => void;
  setSortByField: (s: OrderByField) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageNumber: number;
} {
  const [cursors, setCursors] = useState<DocumentSnapshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snapshots, setSnapshots] = useState<DocumentSnapshot[]>([]);
  const [error, setError] = useState<FirestoreError>();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [sort, setSort] = useState<OrderByField>();
  const hasPreviousPage = cursors.length > 0;

  useEffect(() => {
    setIsLoading(true);
    const constraints: QueryConstraint[] = [
      sort
        ? orderBy(sort.fieldName, sort.direction)
        : orderBy('createdAt', 'desc'),
      limit(perPage + 1),
    ];
    if (initConstraint) {
      constraints.push(initConstraint);
    }
    if (cursors.length > 0) {
      constraints.push(startAfter(cursors[cursors.length - 1]));
    }
    const unsubscribe = onSnapshot(
      query(collection(db, collectionPath), ...constraints),
      (snap) => {
        setSnapshots(snap.docs.slice(0, perPage));
        setHasNextPage(snap.docs.length === perPage + 1);
        setError(undefined);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, [collectionPath, cursors, initConstraint, perPage, sort]);

  const nextPage = () => {
    if (hasNextPage) {
      setCursors([...cursors, snapshots[snapshots.length - 1]]);
    }
  };
  const previousPage = () => {
    if (hasPreviousPage) {
      setCursors(cursors.slice(0, cursors.length - 1));
    }
  };
  const setSortByField = (s: OrderByField) => {
    setCursors([]);
    setSort(s);
  };
  return {
    docs: snapshots,
    isLoading,
    error,
    nextPage,
    previousPage,
    setSortByField,
    hasNextPage,
    hasPreviousPage,
    pageNumber: cursors.length,
  };
}
