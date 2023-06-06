import { DocumentData } from 'firebase/firestore';
import DataTable, { TableColumn } from 'react-data-table-component';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import GetDocumentHOC from '@/hocs/get-document';

import { Listing } from '@/types/listing';

const tableColumns: TableColumn<Listing>[] = [
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
    name: 'Gender',
    cell: (row) => <div>{row.missingGender}</div>,
  },
  {
    name: 'Date',
    cell: (row) => <div>{row.createdAt?.toDate().toDateString()}</div>,
  },
  {
    name: 'Location',
    cell: (row) => <div>{row.missingLastSeenSate}</div>,
  },
  {
    name: 'Age',
    cell: (row) => <div>{row.missingAge}</div>,
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
];

export default function RecentSubmissionsTable() {
  const { docs, setSortByField } = useCollectionPaginated('listings', 5);
  return (
    <div className=' rounded-lg border p-4'>
      <div className='text-xl font-bold'>Recent Submissions</div>
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
          data={docs?.map((doc) => ({ ...doc.data() })) ?? []}
        />
      </div>
    </div>
  );
}
