import { Card } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import UsersInOrganizationCard from '@/components/cards/UsersInOrganizationCard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import Role from '@/components/profile/Role';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { User } from '@/types/user';

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const [data] = useDocumentData<User>(
    user?.organizationId
      ? FirestoreService.getDocRef(`users/${user?.organizationId}`)
      : undefined
  );
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  useEffect(() => {
    if (user?.organizationId) {
      FirestoreService.getUserCountWhere({
        organizationId: user?.organizationId,
      }).then((value) => {
        setTotalUsers(value.data().count);
      });
    }
  }, [user?.organizationId]);

  useEffect(() => {
    if (user?.organizationId) {
      FirestoreService.getSubmissionCountWhere({
        createdBy: user?.organizationId,
      }).then((value) => {
        setTotalSubmissions(value.data().count);
      });
    }
  }, [user?.organizationId]);

  return (
    <DashboardLayout>
      <div className='flex flex-col gap-8'>
        <Card>
          <div className='flex gap-6'>
            <div className='text-2xl font-bold'>{data?.username}</div>
            <Role role='organization' />
          </div>
          <div>Total Users: {totalUsers}</div>
          <div>Total Submissions: {totalSubmissions}</div>
        </Card>
        {user?.organizationId && (
          <UsersInOrganizationCard organizationId={user?.organizationId} />
        )}
      </div>
    </DashboardLayout>
  );
}, ['manager']);
