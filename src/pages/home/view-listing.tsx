import { useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';

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
    <DashboardLayout>
      <div>
        {docs?.map((doc, i) => (
          <div key={i}>
            <div>
              {doc?.missingLastName} {doc.missingFirstName}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
});
