import { Menu, MenuItem } from '@szhsin/react-menu';
import { DocumentData, QueryConstraint } from 'firebase/firestore';
import { Select, TextInput } from 'flowbite-react';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BiEdit } from 'react-icons/bi';
import { BsFillEyeFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { ImInfo } from 'react-icons/im';
import { SlOptions } from 'react-icons/sl';

import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import Button from '@/components/buttons/Button';
import TableSearchInput from '@/components/inputs/table-search-input';
import DashboardLayout2 from '@/components/layout/DashboardLayout2';
import { GeneralModalContext } from '@/components/layout/GeneralModalLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import TabBar from '@/components/layout/TabBar';
import DeleteSubmissionView from '@/components/modal-views/DeleteSubmissionView';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';
import GetDocumentHOC from '@/hocs/get-document';

import { Listing } from '@/types/listing';
import { User } from '@/types/user';

const tableColumns: TableColumn<Listing & { user: User | null }>[] = [
  {
    name: 'Date Posted',
    cell: (row) => (
      <div>{moment(row.createdAt?.toDate()).format('D/MM/YYYY')}</div>
    ),
    sortable: true,
    sortField: 'createdAt',
  },
  {
    name: 'Missing Person',
    selector: (cell) => `${cell.missingFirstName} ${cell.missingLastName}`,
    cell: (cell) => (
      <div>
        <div className='font-bold'>{`${cell.missingFirstName} ${cell.missingLastName}`}</div>
      </div>
    ),
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
    cell: (row) => <div>{row.missingAge}</div>,
  },
  {
    name: 'Last Known Location',
    cell: (row) => <div>{row.missingLastSeenSate}</div>,
  },
  {
    name: 'Gender',
    cell: (row) => <div>{row.missingGender}</div>,
  },
  {
    name: 'Missing Since',
    cell: (row) => (
      <div>{moment(row.missingSince?.toDate()).format('D/MM/YYYY')}</div>
    ),
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
              window.location.href = `/manage-submissions/${row._id}`;
            }
          }}
        >
          <div className='flex gap-2'>
            <BsFillEyeFill />
            <div>View</div>
          </div>
        </MenuItem>
        {(row.user?.role === 'admin' || row.user?.id === row.createdBy) && (
          <>
            <MenuItem
              onClick={() => {
                if (window.location) {
                  window.location.href = `/manage-submissions/${row._id}?mode=edit`;
                }
              }}
            >
              <div className='flex gap-2'>
                <BiEdit />
                <div>Edit</div>
              </div>
            </MenuItem>
            <DeleteMenuItem submission={row} />
          </>
        )}
      </Menu>
    ),
  },
];

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const [idx, setIdx] = useState(0);
  const [mySubmissionsCount, setMySubmissionsCount] = useState(0);
  const [allSubmissionsCount, setAllSubmissionsCount] = useState(0);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    setIdx(Number.parseInt(params.get('tab') ?? '0'));
  }, [params]);

  useEffect(() => {
    const a = async () => {
      const b = await FirestoreService.getSubmissionCountWhere({
        createdBy: user?.id,
      });
      setMySubmissionsCount(b.data().count);
      const c = await FirestoreService.getSubmissionCountWhere({});
      setAllSubmissionsCount(c.data().count);
    };
    a();
  }, [user?.id]);

  const c = useMemo(() => {
    const constraints: QueryConstraint[][] = [
      FirestoreService.getListingsConstraints({ createdBy: user?.id }),
      [],
    ];
    return constraints[idx];
  }, [idx, user?.id]);
  const { docs, error, setSortByField } = useCollectionPaginated(
    'listings',
    20,
    c
  );

  return (
    <DashboardLayout2>
      <div className='layout flex h-screen flex-col gap-6'>
        <div className='flex flex-col items-start justify-between gap-4 lg:flex-row'>
          <div>
            <div className='text-3xl font-extrabold'>Submission</div>
            <div className='font-light text-[#819289]'>
              Stay up to date with submissions made on the platform
            </div>
          </div>
          <Button onClick={() => router.push('/manage-submissions/create')}>
            Add New Submission
          </Button>
        </div>
        <TabBar
          currentIdx={idx}
          onChange={(index) => {
            router.push(`${router.pathname}?tab=${index}`);
            setIdx(index);
          }}
          items={[
            { label: `My Submissions (${mySubmissionsCount})` },
            { label: `All Submissions (${allSubmissionsCount})` },
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
          <div className='flex flex-col items-stretch gap-4 lg:flex-row'>
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
            data={
              docs?.map((doc) => ({ _id: doc.id, user, ...doc.data() })) ?? []
            }
          />
        </div>
      </div>
    </DashboardLayout2>
  );
}, ['manager']);

function DeleteMenuItem({ submission }: { submission: Listing }) {
  const m = useContext(GeneralModalContext);
  return (
    <MenuItem
      onClick={() => {
        m?.setContent(<DeleteSubmissionView submission={submission} />);
        m?.setIsOpen(true);
      }}
    >
      <div className='flex gap-2 text-red-500'>
        <FaTrashAlt />
        <div>Delete</div>
      </div>
    </MenuItem>
  );
}
