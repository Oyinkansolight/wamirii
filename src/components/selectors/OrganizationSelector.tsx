import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

import { User } from '@/types/user';

export default function OrganizationSelector(
  props: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
) {
  const [organizations] = useCollectionDataOnce<User>(
    FirestoreService.getUsersQuery('organization')
  );
  return (
    <div>
      <select
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm capitalize text-gray-900 focus:border-blue-500 focus:ring-blue-500'
        {...props}
      >
        <option value=''>Select Role</option>
        {organizations?.map((organization, i) => (
          <option key={i} value={organization?.username} className='capitalize'>
            {organization?.username?.toLowerCase()} ({organization?.acronym})
          </option>
        ))}
      </select>
    </div>
  );
}
