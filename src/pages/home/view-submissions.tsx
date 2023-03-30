import { useContext, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCollection } from 'react-firebase-hooks/firestore';
import { MdFilterList } from 'react-icons/md';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Loading from '@/components/generic/Loading';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import FilterModal from '@/components/modals/FilterModal';
import MissingAvatar from '@/components/submissions/MissingAvatar';

import {
  FilterByField,
  FirestoreService,
  OrderByField,
} from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import { FilterListings } from '@/types/filter-listings';
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
        <div className='text-xs tracking-widest'>
          {cell.missingAge ? `${cell.missingAge} yo` : ''}
        </div>
      </div>
    ),
    sortable: true,
    sortField: 'missingFirstName',
  },
  {
    name: 'Missing Since',
    selector: (cell) => cell.missingSince?.toDate().toDateString() ?? '',
    sortable: true,
    sortField: 'missingSince',
  },
  {
    name: 'Create At',
    selector: (cell) => cell.createdAt?.toDate().toDateString() ?? '',
    sortable: true,
    sortField: 'createdAt',
  },

  {
    name: 'Action',
    cell: () => <Button className='w-24'>View</Button>,
    width: '150px',
    grow: 0,
  },
];

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);

  const [sortBy, setSortBy] = useState<OrderByField>();
  const [filters, setFilters] = useState<FilterByField[]>([]);

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [docs, loading, error] = useCollection(
    FirestoreService.getListings(user?.id, sortBy, filters)
  );

  const onApplyFilter = (filter: FilterListings) => {
    const f: FilterByField[] = [];
    logger(filter, 'Filter');
    if (filter.missingGender) {
      f.push(['missingGender', '==', filter.missingGender]);
    }
    if (filter.ageFrom) {
      f.push(['missingAge', '>', filter.ageFrom]);
    }
    if (filter.ageTo) {
      logger(filter.ageTo);
      f.push(['missingAge', '<', filter.ageTo]);
    }
    if (filter.missingSinceFrom) {
      f.push(['missingSince', '>', filter.missingSinceFrom]);
    }
    if (filter.missingSinceTo) {
      f.push(['missingSince', '<', filter.missingSinceTo]);
    }
    if (filter.dateReportedFrom) {
      f.push(['missingDateReported', '>', filter.dateReportedFrom]);
    }
    if (filter.dateReportedTo) {
      f.push(['missingDateReported', '<', filter.dateReportedTo]);
    }
    setFilters(f);
  };
  return (
    <DashboardLayout>
      <div className='relative h-full'>
        {(error && <div>{error.message}</div>) || (
          <div>
            <div className='flex justify-end'></div>
            <DataTable
              title='My Submissions'
              actions={[
                <FilterModal key={0} onApplyFilter={onApplyFilter}>
                  <Button>
                    <div className='flex items-center'>
                      <MdFilterList />
                      <div className='w-2' />
                      <div>Filter</div>
                    </div>
                  </Button>
                </FilterModal>,
              ]}
              sortServer
              onSort={(col, dir) => {
                if (!col.sortField || col.sortField === '') return;
                setSortBy({ fieldName: col.sortField ?? '', direction: dir });
              }}
              columns={tableColumns}
              data={
                docs?.docs.map((doc) => ({ _id: doc.id, ...doc.data() })) ?? []
              }
            />
          </div>
        )}
        {loading && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loading />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
});
