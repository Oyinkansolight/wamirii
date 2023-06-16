import DataTable, { TableColumn } from 'react-data-table-component';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import { User } from '@/types/user';

const tableColumns: TableColumn<User>[] = [
  {
    name: 'Date Created',
    cell: (row) => <div>{row.createdAt?.toDate().toDateString()}</div>,
    sortable: true,
    sortField: 'createdAt',
  },
  {
    name: 'Name',
    selector: (cell) => `${cell.username}`,
    cell: (cell) => (
      <div>
        <div className='font-bold'>{cell.username}</div>
      </div>
    ),
  },
  {
    name: 'User Type',
    cell: (row) => <div>{row.role ?? 'user'}</div>,
  },
];

export default function RecentUsersTable() {
  const { docs, setSortByField } = useCollectionPaginated('users', 5);
  return (
    <div className=' rounded-lg border p-4'>
      <div className='text-xl font-bold'>Registered Users</div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center justify-center text-center'>
          <div>
            <div className='text-sm text-[#819289]'>Total No Of Users</div>
            <div className='text-xl font-bold'>20,000</div>
          </div>
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
  );
}
