import { Menu, MenuItem } from '@szhsin/react-menu';
import { QueryConstraint } from 'firebase/firestore';
import { Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BiEdit } from 'react-icons/bi';
import { BsFillEyeFill } from 'react-icons/bs';
import { ImInfo } from 'react-icons/im';
import { SlOptions } from 'react-icons/sl';

import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import Button from '@/components/buttons/Button';
import TableSearchInput from '@/components/inputs/table-search-input';
import DashboardLayout2 from '@/components/layout/DashboardLayout2';
import TabBar from '@/components/layout/TabBar';
import Role from '@/components/profile/Role';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { User } from '@/types/user';

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
    name: 'Status',
    cell: (row) => <Role role={row.status ?? 'active'} />,
  },
  {
    // width: '20px',
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

export default AuthGuardHOC(() => {
  // const user = useContext(UserContext);
  const [idx, setIdx] = useState(0);
  const router = useRouter();

  // useEffect(() => {
  //   const a = async () => {
  //     eval('');
  //   };
  //   a();
  // }, [user?.id]);

  const c = useMemo(() => {
    const constraints: QueryConstraint[][] = [
      FirestoreService.getUsersConstraints({ role: 'user' }),
      FirestoreService.getUsersConstraints({ role: 'admin' }),
      FirestoreService.getUsersConstraints({ role: 'manager' }),
      FirestoreService.getUsersConstraints({ role: 'volunteer' }),
    ];
    return constraints[idx];
  }, [idx]);
  const { docs, error, setSortByField } = useCollectionPaginated('users', 5, c);

  return (
    <DashboardLayout2>
      <div className='layout flex h-screen flex-col gap-6'>
        <div className='flex items-start justify-between'>
          <div>
            <div className='text-3xl font-extrabold'>Users</div>
            <div className='font-light text-[#819289]'>
              Manage all types of users and create sub admins to enable you
              manage data better
            </div>
          </div>
          <Button onClick={() => router.push('/admin/submissions/create')}>
            Add New User
          </Button>
        </div>
        <TabBar
          currentIdx={idx}
          onChange={setIdx}
          items={[
            { label: `General Users (${0})` },
            { label: `Admins (${0})` },
            { label: 'Managers (0)' },
            { label: `Volunteers (${0})` },
          ]}
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
              <option>Select Gender</option>
            </Select>
            <Select>
              <option>Last Location</option>
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
            columns={tableColumns}
            data={docs?.map((doc) => ({ id: doc.id, ...doc.data() })) ?? []}
          />
        </div>
      </div>
    </DashboardLayout2>
  );
});

// function DeleteMenuItem({ submission }: { submission: Listing }) {
//   const m = useContext(GeneralModalContext);
//   return (
//     <MenuItem
//       onClick={() => {
//         m?.setContent(<DeleteSubmissionView submission={submission} />);
//         m?.setIsOpen(true);
//       }}
//     >
//       <div className='flex gap-2 text-red-500'>
//         <FaTrashAlt />
//         <div>Delete</div>
//       </div>
//     </MenuItem>
//   );
// }
