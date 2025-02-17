import {
  collection,
  DocumentData,
  FirestoreError,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@/firebase/init';

export function useCollectionInfinite<T>(
  collectionPath: string,
  perPage = 5
): [
  (T & { _id: string }[]) | undefined,
  boolean,
  FirestoreError | undefined,
  () => void,
  boolean
] {
  const [l, setL] = useState(perPage);

  const [isLoading, setIsLoading] = useState(true);
  const [docs, setDocs] = useState<DocumentData>();
  const [error, setError] = useState<FirestoreError>();
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const constraints: QueryConstraint[] = [
      where('deleted', '==', false),
      orderBy('createdAt', 'desc'),
      limit(l + 1),
    ];
    const unsubscribe = onSnapshot(
      query(collection(db, collectionPath), ...constraints),
      (snap) => {
        setDocs(snap.docs.map((d) => ({ _id: d.id, ...d.data() })).slice(0, l));
        setError(undefined);
        setIsLoading(false);
        setIsLastPage(snap.docs.length < l + 1);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, [l, collectionPath]);

  const more = () => {
    if (!isLastPage) {
      setL(l + perPage);
    }
  };
  return [
    docs as unknown as (T & { _id: string }[]) | undefined,
    isLoading,
    error,
    more,
    isLastPage,
  ];
}
