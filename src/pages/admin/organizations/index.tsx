import { Menu, MenuItem } from '@szhsin/react-menu';
import { QueryConstraint } from 'firebase/firestore';
import { Select, TextInput } from 'flowbite-react';
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
import TabBar from '@/components/layout/TabBar';
import CreateUserView from '@/components/modal-views/CreateUserView';
import Role from '@/components/profile/Role';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { Role as R, User } from '@/types/user';

const tableColumns: TableColumn<User>[] = [
  {
    name: 'Date Created',
    cell: (row) => <div>{row.createdAt?.toDate().toDateString()}</div>,
    sortable: true,
    sortField: 'createdAt',
  },
  {
    name: 'Organization Name',
    selector: (cell) => `${cell.username}`,
    cell: (cell) => (
      <div>
        <div className='font-bold'>{cell.username}</div>
      </div>
    ),
  },
  {
    name: 'Acronym',
    cell: (row) => <div>{row.acronym}</div>,
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
              window.location.href = `/admin/submissions/${row.id}`;
            }
          }}
        >
          <div className='flex gap-2'>
            <BsFillEyeFill />
            <div>View</div>
          </div>
        </MenuItem>
        <MenuItem>
          <div className='flex gap-2'>
            <BiEdit />
            <div>Edit</div>
          </div>
        </MenuItem>
        {/* <DeleteMenuItem submission={row} /> */}
      </Menu>
    ),
  },
];

const possibleColumns = [
  tableColumns,
  tableColumns,
  tableColumns,
  tableColumns,
];

export default AuthGuardHOC(() => {
  // const user = useContext(UserContext);
  const [idx, setIdx] = useState(0);
  const [usersCount, setUsersCount] = useState({
    organization: 0,
  });

  useEffect(() => {
    const a = async () => {
      const organization = (
        await FirestoreService.getUserCountWhere({ role: 'organization' })
      ).data().count;
      setUsersCount({ organization });
    };
    a();
  }, []);

  const c = useMemo(() => {
    const constraints: QueryConstraint[][] = [
      FirestoreService.getUsersConstraints({ role: 'organization' }),
    ];
    return constraints[idx];
  }, [idx]);
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
            <div className='text-3xl font-extrabold'>Organizations</div>
            <div className='font-light text-[#819289]'>
              Manage all types of users and create sub admins to enable you
              manage data better
            </div>
          </div>
          <Button onClick={() => handleCreateNewUser('organization')}>
            Add New Organization
          </Button>
        </div>
        <TabBar
          currentIdx={idx}
          onChange={setIdx}
          items={[{ label: `Organizations (${usersCount.organization})` }]}
        />
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
            <Select>
              <option>Status</option>
            </Select>
            <TextInput type='date' />
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
            columns={possibleColumns[idx]}
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
