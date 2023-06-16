import { DocumentData, QueryConstraint } from 'firebase/firestore';
import { Button } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { GrFormEdit, GrFormView } from 'react-icons/gr';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import Loading from '@/components/generic/Loading';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import ButtonLink from '@/components/links/ButtonLink';
import MissingAvatar from '@/components/submissions/MissingAvatar';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';
import GetDocumentHOC from '@/hocs/get-document';

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
      </div>
    ),
    sortable: true,
    sortField: 'missingFirstName',
  },
  {
    name: 'Reporter',
    cell: (row) => {
      const C = GetDocumentHOC(
        ({ doc }: { doc: DocumentData }) => <div>{doc.username}</div>,
        `users/${row.createdBy}`
      );
      return <C />;
    },
  },
  {
    name: 'Age',
    selector: (cell) => cell.missingAge ?? '',
    sortable: true,
    sortField: 'missingAge',
  },
  {
    name: 'Last Known Location',
    selector: (cell) => cell.missingLastSeenSate ?? '',
    sortable: true,
    sortField: 'missingLastSeenSate',
  },
  {
    name: 'Gender',
    selector: (cell) => cell.missingGender ?? '',
    sortable: true,
    sortField: 'missingGender',
  },
  {
    name: 'Missing Since',
    selector: (cell) => cell.missingSince?.toDate().toDateString() ?? '',
    sortable: true,
    sortField: 'missingSince',
  },
  {
    name: 'Date Reported',
    selector: (cell) => cell.createdAt?.toDate().toDateString() ?? '',
    sortable: true,
    sortField: 'createdAt',
  },

  {
    name: 'Action',
    cell: (cell) => (
      <div className='flex items-center'>
        <GrFormView
          onClick={() => {
            window.location.href = `/home/submission/${cell._id}`;
          }}
          className='h-5 w-5 cursor-pointer'
        />
        <GrFormEdit
          onClick={() => {
            window.location.href = `/home/submission/edit/${cell._id}`;
          }}
          className='h-5 w-5 cursor-pointer'
        />
      </div>
    ),
    width: '150px',
    grow: 0,
  },
];

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const [userConstraint, setUserConstraint] = useState<QueryConstraint[]>();
  useEffect(() => {
    setUserConstraint(
      FirestoreService.getListingsConstraints({
        createdBy: user?.organizationId,
      })
    );
  }, [user?.organizationId]);

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
  } = useCollectionPaginated('listings', undefined, userConstraint);

  return (
    <DashboardLayout>
      <div className='relative h-full'>
        {(error && <div>{error.message}</div>) ||
          (user?.organizationId && (
            <div>
              <div className='flex justify-end'></div>
              <DataTable
                title='All Submissions'
                noDataComponent={
                  <div className='flex h-52 flex-col items-center justify-center'>
                    <div>You are yet to create any submissions</div>
                    <div className='h-5' />
                    <ButtonLink href='/home/create-submission'>
                      Create Submission
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
                data={
                  docs?.map((doc) => ({ _id: doc.id, ...doc.data() })) ?? []
                }
              />
            </div>
          ))}
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
}, ['manager']);
