import { useCollection } from 'react-firebase-hooks/firestore';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

export default AuthGuardHOC(() => {
  // const user = useContext(UserContext);
  const [docs, loading, error] = useCollection(
    FirestoreService.getUsersQuery()
  );
  if (error) {
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {docs?.docs.map((doc, i) => (
        <div key={i}>{`${doc.data().username}`}</div>
      ))}
    </div>
  );
});
