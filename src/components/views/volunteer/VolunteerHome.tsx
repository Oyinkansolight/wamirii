import { useContext, useMemo } from 'react';
import { BiChevronRight } from 'react-icons/bi';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import ListingCard2 from '@/components/cards/ListingCard2';
import { UserContext } from '@/components/layout/GetAuthStatus';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function VolunteerHome() {
  const user = useContext(UserContext);
  const { docs } = useCollectionPaginated('listings', 3);

  const constraints = useMemo(
    () =>
      user?.id
        ? FirestoreService.getListingsConstraints({ createdBy: user?.id })
        : undefined,
    [user?.id]
  );

  const { docs: mySubmissions } = useCollectionPaginated(
    'listings',
    10,
    constraints
  );
  return (
    <>
      <div className='my-4 text-xl font-bold'>Recent Submissions</div>
      <div className='flex justify-between'>
        {docs?.map((v, i) => (
          <ListingCard2 key={i} listing={{ ...v.data(), _id: v.id }} />
        ))}
      </div>
      <div className='h-16' />
      <div className='flex items-center justify-between'>
        <div className='my-4 text-xl font-bold'>My Submissions</div>
        <div className='flex font-bold text-[#13602C]'>
          <div>View All My Submissions</div>
          <BiChevronRight className='h-6 w-6' />
        </div>
      </div>
      <div className='flex justify-between'>
        {mySubmissions?.map((v, i) => (
          <ListingCard2 key={i} listing={{ ...v.data(), _id: v.id }} />
        ))}
      </div>
      <div className='h-16' />
      <div className='flex items-center justify-between rounded-lg bg-[#13602C] p-16'>
        <div className='text-5xl font-bold text-white'>
          Do you have new
          <br /> submissions for
          <br /> us today?
        </div>
        <div className='flex w-[328px] justify-center rounded-md bg-white py-4'>
          <div>Start Submitting</div>
        </div>
      </div>
      <div className='h-16' />
      <div className='flex items-center justify-between'>
        <div className='my-4 text-xl font-bold'>Recently Found Persons</div>
        <div className='flex font-bold text-[#13602C]'>
          <div>View All</div>
          <BiChevronRight className='h-6 w-6' />
        </div>
      </div>
    </>
  );
}
