import { Button, Table } from 'flowbite-react';
import { useContext } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import MissingAvatar from '@/components/submissions/MissingAvatar';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

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
  },
  {
    name: '',
    cell: () => (
      <div>
        <Button className='w-24'>View</Button>
      </div>
    ),
    width: '150px',
  },
];

export default AuthGuardHOC(() => {
  const user = useContext(UserContext);
  const [docs, loading, error] = useCollectionData<Listing>(
    FirestoreService.getListings(user?.id)
  );
  return (
    <DashboardLayout>
      <div>
        <div>
          <Table></Table>
        </div>
        {(error && <div>{error.message}</div>) ||
          (loading && <div>Loading...</div>) || (
            <DataTable columns={tableColumns} data={docs ?? []} />
          )}
      </div>
    </DashboardLayout>
  );
});
