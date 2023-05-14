import { QueryConstraint } from 'firebase/firestore';
import { Button, Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { GrFormView } from 'react-icons/gr';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import Loading from '@/components/generic/Loading';
import ButtonLink from '@/components/links/ButtonLink';
import ProfilePicture from '@/components/profile/ProfilePicture';
import Role from '@/components/profile/Role';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import GetDocumentHOC from '@/hocs/get-document';

import { User } from '@/types/user';

const tableColumns: TableColumn<User>[] = [
  {
    name: '',
    cell: (cell) => <ProfilePicture user={cell} />,
    grow: 0,
  },
  {
    name: 'Full Name',
    selector: (cell) => `${cell.username}`,
    cell: (cell) => (
      <div>
        <div className='font-bold'>{cell.username}</div>
      </div>
    ),
  },
  {
    name: 'Status',
    cell: (row) => <Role role={row.role ?? ''} />,
    sortable: true,
    sortField: 'createdAt',
  },
  {
    name: 'Organization',
    cell: (row) => {
      if (row.organizationId) {
        const C = GetDocumentHOC(
          (p) => <div>{p.doc.username}</div>,
          `users/${row.organizationId}`
        );
        return <C />;
      } else {
        return <div>None</div>;
      }
    },
  },
  {
    name: 'Joined',
    cell: (row) => <div>{row.createdAt?.toDate().toDateString()}</div>,
    sortable: true,
    sortField: 'createdAt',
  },
  {
    name: 'Action',
    cell: (cell) => (
      <div
        onClick={() => (window.location.href = `/home/users/edit/${cell.id}`)}
        className='flex items-center'
      >
        <GrFormView className='h-5 w-5 cursor-pointer' />
      </div>
    ),
    width: '150px',
    grow: 0,
  },
];

export default function UsersInOrganizationCard({
  organizationId,
}: {
  organizationId: string;
}) {
  const [userConstraint, setUserConstraint] = useState<QueryConstraint[]>();
  useEffect(() => {
    setUserConstraint(FirestoreService.getUsersConstraints({ organizationId }));
  }, [organizationId]);
  const {
    docs,
    error,
    isLoading,
    nextPage,
    previousPage,
    pageNumber,
    hasNextPage,
    hasPreviousPage,
    setSortByField,
  } = useCollectionPaginated('users', undefined, userConstraint);
  return (
    <Card>
      <div className='relative h-full'>
        {(error && <div>{error.message}</div>) || (
          <div>
            <div className='flex justify-end'></div>
            <DataTable
              title='Manage Users'
              noDataComponent={
                <div className='flex h-52 flex-col items-center justify-center'>
                  <div>
                    You are yet to create any Users in this organization
                  </div>
                  <div className='h-5' />
                  <ButtonLink href='/home/users/create'>
                    Create A User
                  </ButtonLink>
                </div>
              }
              sortServer
              onSort={(col, dir) => {
                if (!col.sortField || col.sortField === '') return;
                setSortByField({
                  fieldName: col.sortField ?? '',
                  direction: dir,
                });
              }}
              columns={tableColumns}
              data={docs?.map((doc) => ({ id: doc.id, ...doc.data() })) ?? []}
            />
          </div>
        )}
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loading />
          </div>
        )}
        <div className='flex items-center justify-center'>
          <Button disabled={!hasPreviousPage} onClick={() => previousPage()}>
            Previous
          </Button>
          <div className='px-20'>Page: {pageNumber}</div>
          <Button disabled={!hasNextPage} onClick={() => nextPage()}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
