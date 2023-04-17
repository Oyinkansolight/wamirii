import { doc, FirestoreError } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import { db } from '@/firebase/init';

export default function useGetSingleSubmission<T>(
  docId: string | undefined
): [(T & { _id: string }) | undefined, boolean, FirestoreError | undefined] {
  const [data, loading, error] = useDocument(doc(db, `listings/${docId}`));

  return [
    { _id: data?.id, ...data?.data() } as unknown as T & { _id: string },
    loading,
    error,
  ];
}
