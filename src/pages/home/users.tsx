import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCollection } from 'react-firebase-hooks/firestore';

import Loading from '@/components/generic/Loading';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfilePicture from '@/components/profile/ProfilePicture';

import {
  FirestoreService,
  OrderByField,
} from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { User } from '@/types/user';

const tableColumns: TableColumn<User>[] = [
  {
    name: '',
    cell: (cell) => <ProfilePicture user={cell} />,
    grow: 0,
  },
  {
    name: 'Name',
    selector: (cell) => cell.username ?? '',
    cell: (cell) => <div>{cell.username}</div>,
    sortable: true,
    sortField: 'missingFirstName',
  },
  {
    name: 'Total Submissions',
    selector: (cell) => cell.submissionsCount ?? 0,
    cell: (cell) => <div>{cell.submissionsCount ?? 0}</div>,
    sortable: true,
    sortField: 'submissionsCount',
  },
];

export default AuthGuardHOC(() => {
  // const user = useContext(UserContext);

  const [, setSortBy] = useState<OrderByField>();
  const [docs, loading, error] = useCollection(
    FirestoreService.getUsersQuery()
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <DashboardLayout>
      <div className='relative h-full'>
        {(error && <div>{error.message}</div>) || (
          <div>
            <div className='flex justify-end'></div>
            <DataTable
              title='All Users'
              sortServer
              onSort={(col, dir) => {
                if (!col.sortField || col.sortField === '') return;
                setSortBy({ fieldName: col.sortField ?? '', direction: dir });
              }}
              columns={tableColumns}
              data={docs?.docs.map((doc) => doc.data()) ?? []}
            />
          </div>
        )}
        {loading && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loading />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
});
