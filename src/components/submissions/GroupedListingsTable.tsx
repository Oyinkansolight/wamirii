import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCollection } from 'react-firebase-hooks/firestore';

import ProfilePicture from '@/components/profile/ProfilePicture';

import {
  FirestoreService,
  OrderByField,
} from '@/firebase/firestore/firestore-service';
import GetDocumentHOC from '@/hocs/get-document';

import { User } from '@/types/user';

const tableColumns: TableColumn<User>[] = [
  {
    name: '',
    cell: (cell) => {
      const C = GetDocumentHOC((props) => {
        return (
          <div className='py-2'>
            <ProfilePicture user={props.doc as User} />
          </div>
        );
      }, `users/${cell.id}`);
      return <C />;
    },
    grow: 0,
  },
  {
    name: 'Name',
    selector: (cell) => cell.username ?? '',
    cell: (cell) => {
      const C = GetDocumentHOC((props) => {
        return <div>{props.doc.username}</div>;
      }, `users/${cell.id}`);
      return <C />;
    },
  },
  {
    name: 'Total Submissions',
    selector: (cell) => cell.submissionsCount ?? 0,
    cell: (cell) => <div>{cell.submissionsCount ?? 0}</div>,
    sortable: true,
    sortField: 'submissionsCount',
  },
];

export default function GroupedListingsTable({ group }: { group: string }) {
  const [sortBy, setSortBy] = useState<OrderByField>();
  const [docs, loading, error] = useCollection(
    FirestoreService.getGroupedUsers(group, sortBy)
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <DataTable
      sortServer
      onSort={(col, dir) => {
        if (!col.sortField || col.sortField === '') return;
        setSortBy({ fieldName: col.sortField ?? '', direction: dir });
      }}
      columns={tableColumns}
      data={docs?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ?? []}
    />
  );
}
