import { Menu, MenuItem } from '@szhsin/react-menu';
import { QueryConstraint } from 'firebase/firestore';
import { Select, TextInput } from 'flowbite-react';
import Image from 'next/image';
import { useContext, useEffect, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BiEdit } from 'react-icons/bi';
import { BsFillEyeFill } from 'react-icons/bs';
import { ImInfo } from 'react-icons/im';
import { SlOptions } from 'react-icons/sl';

import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import Button from '@/components/buttons/Button';
import Pagination from '@/components/buttons/Pagination';
import TableSearchInput from '@/components/inputs/table-search-input';
import DashboardLayout2 from '@/components/layout/DashboardLayout2';
import { GeneralModalContext } from '@/components/layout/GeneralModalLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import CreateUserView from '@/components/modal-views/CreateUserView';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { Role as R, Role, User } from '@/types/user';

const tableColumns: TableColumn<User>[] = [
  {
    name: 'Date Created',
    cell: (row) => <div>{row.createdAt?.toDate().toDateString()}</div>,
    sortable: true,
    sortField: 'createdAt',
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
    name: 'Phone Number',
    cell: (row) => <div>{row.phoneNumber}</div>,
  },
  {
    name: 'Email',
    cell: (row) => <div>{row.email}</div>,
  },
  {
    name: 'No of Submissions',
    cell: (row) => <SubmissionCount userId={row.id} />,
  },
  {
    width: '40px',
    cell: (row) => (
      <Menu
        menuButton={
          <div className='rounded bg-[#E7EFEA] py-1 px-1  text-[#819289]'>
            <SlOptions />
          </div>
        }
        transition
      >
        <MenuItem
          onClick={() => {
            if (window.location) {
              // window.location.href = `/admin/submissions/${row.id}`;
            }
          }}
        >
          <div className='flex gap-2'>
            <BsFillEyeFill />
            <div>View</div>
          </div>
        </MenuItem>
        <EditUserMenuItem role={row.role ?? 'user'} user={row} />
        {/* <DeleteMenuItem submission={row} /> */}
      </Menu>
    ),
  },
];

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const [usersCount, setUsersCount] = useState({
    volunteer: 0,
  });

  useEffect(() => {
    const a = async () => {
      if (user?.organizationId) {
        const volunteer = (
          await FirestoreService.getUserCountWhere({
            role: 'volunteer',
            organizationId: user?.organizationId,
          })
        ).data().count;
        setUsersCount({ volunteer });
      }
    };
    a();
  }, [user?.organizationId]);

  const c = useMemo(() => {
    const constraints: QueryConstraint[][] = [
      FirestoreService.getUsersConstraints({
        role: 'volunteer',
        organizationId: user?.organizationId,
      }),
    ];
    return constraints[0];
  }, [user?.organizationId]);
  const {
    docs,
    error,
    setSortByField,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    pageNumber,
  } = useCollectionPaginated('users', 5, c);

  const general = useContext(GeneralModalContext);

  const handleCreateNewUser = (role: R) => {
    if (general) {
      general.setContent(
        <CreateUserView onClose={() => general.setIsOpen(false)} role={role} />
      );
      general.setIsOpen(true);
    }
  };

  return (
    <DashboardLayout2>
      <div className='layout flex h-screen flex-col gap-6'>
        <div className='flex items-start justify-between'>
          <div>
            <div className='text-3xl font-extrabold'>Volunteers</div>
            <div className='font-light text-[#819289]'>
              Manage all types of users and create sub admins to enable you
              manage data better
            </div>
          </div>
          <Button onClick={() => handleCreateNewUser('volunteer')}>
            Add New Volunteer
          </Button>
        </div>
        <TotalVolunteers count={usersCount.volunteer} />
        {error && (
          <div
            className='mb-4 flex rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400'
            role='alert'
          >
            <ImInfo className='h-5 w-5' />
            <span className='sr-only'>Info</span>
            <div>
              <span className='font-medium'>Error!</span> {error.message}
            </div>
          </div>
        )}
        <div className='rounded-lg border p-5'>
          <div className='flex items-stretch gap-4'>
            <div className='flex-1'>
              <TableSearchInput />
            </div>
            <TextInput type='date' />
            <Select>
              <option>Total Submissions</option>
            </Select>
          </div>
          <DataTable
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
        <Pagination
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          nextPage={nextPage}
          previousPage={previousPage}
          pageNumber={pageNumber}
        />
      </div>
    </DashboardLayout2>
  );
});

function SubmissionCount({ userId }: { userId?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const run = async () => {
      if (userId) {
        setCount(
          await (
            await FirestoreService.getSubmissionCountWhere({
              createdBy: userId,
            })
          ).data().count
        );
      }
    };
    run();
  }, [userId]);
  return <div>{count}</div>;
}

function TotalVolunteers({ count }: { count: number }) {
  return (
    <div className='flex justify-start'>
      <div className='flex items-start gap-4 rounded-lg p-5 pr-20 shadow'>
        <div className='rounded-lg bg-[#DBF3DB] p-2'>
          <Image src='/images/avatar.png' alt='avatar' height={36} width={36} />
        </div>
        <div>
          <div className='text-xl font-bold'>Total No of Volunteers</div>
          <div className='h-5' />
          <div className='text-5xl font-bold'>{count.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

function EditUserMenuItem({ user, role }: { user?: User; role: Role }) {
  const g = useContext(GeneralModalContext);
  return (
    <MenuItem
      onClick={() => {
        if (g) {
          g.setContent(
            <CreateUserView
              onClose={() => g.setIsOpen(false)}
              role={role}
              userToEdit={user}
            />
          );
          g.setIsOpen(true);
        }
      }}
    >
      <div className='flex gap-2'>
        <BiEdit />
        <div>Edit</div>
      </div>
    </MenuItem>
  );
}
