import { QueryConstraint } from 'firebase/firestore';
import Link from 'next/link';
import { useContext, useMemo } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import Button from '@/components/buttons/Button';
import { UserContext } from '@/components/layout/GetAuthStatus';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { User } from '@/types/user';

const tableColumns: TableColumn<User>[] = [
  {
    name: 'Volunteer',
    selector: (cell) => `${cell.username}`,
    cell: (cell) => (
      <div>
        <div className='font-bold'>{cell.username}</div>
      </div>
    ),
  },
  {
    name: 'Email Address',
    cell: (row) => <div>{row.email}</div>,
  },
];

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);

  const c = useMemo(() => {
    const constraints: QueryConstraint[][] = [
      FirestoreService.getUsersConstraints({
        role: 'volunteer',
        organizationId: user?.organizationId,
      }),
    ];
    return constraints[0];
  }, [user?.organizationId]);
  const { docs } = useCollectionPaginated('users', 10, c);

  return (
    <div className='rounded-lg border border-dashed bg-[#EDF3F0] p-4'>
      <div className='flex items-center justify-between'>
        <div className='font-bold'>Recent Volunteers</div>
        <Link href='/manager/volunteers'>
          <Button variant='outline'>View All</Button>
        </Link>
      </div>
      <div className='h-6' />
      <DataTable
        customStyles={{
          table: { style: { backgroundColor: '#FFFFFF66' } },
          rows: { style: { backgroundColor: '#00000000' } },
          headRow: {
            style: { backgroundColor: '#00000000', color: '#819289' },
          },
        }}
        columns={tableColumns}
        data={docs?.map((doc) => ({ id: doc.id, ...doc.data() })) ?? []}
      />
    </div>
  );
});
