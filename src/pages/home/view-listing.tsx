import { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { UserContext } from '@/components/layout/AuthGuard';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { Listing } from '@/types/listing';

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const [docs, loading, error] = useCollectionData<Listing>(
    FirestoreService.getListings(user?.id)
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      {docs?.map((doc, i) => (
        <div key={i}>
          <div>
            {doc.person?.lastName} {doc.person?.firstName}
          </div>
        </div>
      ))}
    </div>
  );
});
