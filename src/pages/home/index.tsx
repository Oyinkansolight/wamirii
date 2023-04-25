import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import Loading from '@/components/generic/Loading';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import GroupedListingsTable from '@/components/submissions/GroupedListingsTable';

import { AuthService } from '@/firebase/auth/auth-service';
import {
  FirestoreService,
  OrderByField,
} from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import ListingsGroup from '@/types/listings-group';

const tableColumns: TableColumn<ListingsGroup>[] = [
  {
    name: '',
    cell: (cell) => <div className='py-4 font-bold'>{cell.format}</div>,
  },
];

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const router = useRouter();
  const [doc] = useDocumentData(FirestoreService.getDocRef('global/global'));

  const [, setSortBy] = useState<OrderByField>();
  const [docs, loading, error] = useCollection(FirestoreService.getDateGroup());
  return (
    <DashboardLayout>
      <div className='flex h-screen flex-col items-center justify-center'>
        <div className='mb-2 text-xl font-bold md:mb-10 md:text-center md:text-3xl'>
          Total Submissions: {doc?.totalSubmissions ?? 0}
        </div>

        <div className='layout relative h-full'>
          {(error && <div>{error.message}</div>) || (
            <div>
              <div className='flex justify-end'></div>
              <DataTable
                title='Volunteer Submission Count'
                sortServer
                onSort={(col, dir) => {
                  if (!col.sortField || col.sortField === '') return;
                  setSortBy({ fieldName: col.sortField ?? '', direction: dir });
                }}
                columns={tableColumns}
                data={
                  (docs?.docs.map((doc) => doc.data()) ?? []) as ListingsGroup[]
                }
                expandableRows
                expandableRowExpanded={() => true}
                expandableRowsComponent={(data) => (
                  <GroupedListingsTable group={data.data.format} />
                )}
              />
            </div>
          )}
          {loading && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loading />
            </div>
          )}
        </div>

        {user && (
          <div className='mt-6'>
            {' '}
            Logged in as <span className='font-bold'>{user.username}</span>
          </div>
        )}
        <div>
          <button
            className='text-red-500'
            onClick={async () => {
              await AuthService.signOut();
              router.push('/');
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
});
