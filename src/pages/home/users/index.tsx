import { QueryConstraint } from 'firebase/firestore';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { GrFormEdit } from 'react-icons/gr';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import Loading from '@/components/generic/Loading';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import ProfilePicture from '@/components/profile/ProfilePicture';
import Role from '@/components/profile/Role';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';
import GetDocumentHOC from '@/hocs/get-document';

import { Role as R, User } from '@/types/user';

const tableColumns: TableColumn<User>[] = [
  {
    name: 'Date Created',
    cell: (row) => <div>{row.createdAt?.toDate().toDateString()}</div>,
    sortable: true,
    sortField: 'createdAt',
  },
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
    name: 'Email',
    cell: (row) => <div>{row.email}</div>,
  },
  {
    name: 'Status',
    cell: (row) => <Role role={row.status ?? 'active'} />,
  },
  {
    name: 'Edit',
    cell: (cell) => (
      <div
        onClick={() => (window.location.href = `/home/users/edit/${cell.id}`)}
        className='flex items-center'
      >
        <GrFormEdit className='h-5 w-5 cursor-pointer' />
      </div>
    ),
    width: '150px',
    grow: 0,
  },
];

const managerColumns: TableColumn<User>[] = [
  {
    name: 'Date Joined',
    cell: (row) => (
      <div>
        {row.joinedAt?.toDate().toDateString() ??
          row.createdAt?.toDate().toDateString()}
      </div>
    ),
    sortable: true,
    sortField: 'createdAt',
  },
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
    name: 'Email',
    cell: (row) => <div>{row.email}</div>,
  },
  {
    name: 'Status',
    cell: (row) => <Role role={row.status ?? 'active'} />,
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
    name: 'Edit',
    cell: (cell) => (
      <div
        onClick={() => (window.location.href = `/home/users/edit/${cell.id}`)}
        className='flex items-center'
      >
        <GrFormEdit className='h-5 w-5 cursor-pointer' />
      </div>
    ),
    width: '150px',
    grow: 0,
  },
];

export default AuthGuardHOC(() => {
  const [userConstraint, setUserConstraint] = useState<QueryConstraint[]>();
  const router = useRouter();
  const role = router.query['role'] as R;
  useEffect(() => {
    setUserConstraint(FirestoreService.getUsersConstraints({ role }));
  }, [role]);
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
    <DashboardLayout>
      <div className='relative h-full'>
        {(error && <div>{error.message}</div>) || (
          <div>
            <div className='my-4 flex justify-end'>
              <ButtonLink href={`/home/users/create?role=${role}`}>
                Create {role}
              </ButtonLink>
            </div>
            <DataTable
              title='Manage Users'
              noDataComponent={
                <div className='flex h-52 flex-col items-center justify-center'>
                  <div>You are yet to create any {role}s</div>
                  <div className='h-5' />
                  <ButtonLink href={`/home/users/create?role=${role}`}>
                    Create A {role}
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
              columns={
                role === 'manager' || role === 'volunteer'
                  ? managerColumns
                  : tableColumns
              }
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
    </DashboardLayout>
  );
}, ['admin']);
