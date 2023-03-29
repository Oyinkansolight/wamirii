import { Button, Table } from 'flowbite-react';
import { useContext, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import logger from '@/lib/logger';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import MissingAvatar from '@/components/submissions/MissingAvatar';

import {
  FirestoreService,
  OrderByField,
} from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { Listing } from '@/types/listing';

const tableColumns: TableColumn<Listing>[] = [
  {
    name: '',
    cell: (cell) => <MissingAvatar listing={cell} />,
    grow: 0,
  },
  {
    name: 'Name',
    selector: (cell) => `${cell.missingFirstName} ${cell.missingLastName}`,
    cell: (cell) => (
      <div>
        <div className='font-bold'>
          {cell.missingFirstName} {cell.missingLastName}
        </div>
        <div className='text-xs tracking-widest'>
          {cell.missingAge ? `${cell.missingAge} yo` : ''}
        </div>
      </div>
    ),
    sortable: true,
    sortField: 'missingFirstName',
  },
  {
    name: 'Missing Since',
    selector: (cell) => cell.missingSince?.toDate().toDateString() ?? '',
    sortable: true,
    sortField: 'missingSince',
    grow: 0,
    width: 'auto',
  },
  {
    name: 'Create At',
    selector: (cell) => cell.createdAt?.toDate().toDateString() ?? '',
    sortable: true,
    sortField: 'createdAt',
    grow: 0,
    width: 'auto',
  },

  {
    name: 'Action',
    cell: () => <Button className='w-24'>View</Button>,
    width: '150px',
    grow: 0,
  },
];

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const [sortBy, setSortBy] = useState<OrderByField>();

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [docs, loading, error] = useCollectionData<Listing>(
    FirestoreService.getListings(user?.id, sortBy)
  );
  return (
    <DashboardLayout>
      <div>
        <div>
          <Table></Table>
        </div>
        {(error && <div>{error.message}</div>) || (
          <DataTable
            sortServer
            onSort={(col, dir) => {
              if (!col.sortField || col.sortField === '') return;
              logger(col.sortField);
              setSortBy({ fieldName: col.sortField ?? '', direction: dir });
            }}
            columns={tableColumns}
            data={docs ?? []}
          />
        )}
      </div>
    </DashboardLayout>
  );
});
