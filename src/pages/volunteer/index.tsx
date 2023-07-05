import { QueryConstraint } from 'firebase/firestore';
import { useContext, useMemo, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsFillCalendarFill, BsSearch } from 'react-icons/bs';
import { IoLocation } from 'react-icons/io5';
import ReactSelect from 'react-select';

import { useCollectionPaginated } from '@/hooks/useCollectionPaginated';

import ListingCard2 from '@/components/cards/ListingCard2';
import SubmissionView from '@/components/cards/SubmissionView';
import { GeneralModalContext } from '@/components/layout/GeneralModalLayout';
import { UserContext } from '@/components/layout/GetAuthStatus';
import VolunteerHeader from '@/components/layout/VolunteerHeader';
import VolunteerStatistics from '@/components/views/volunteer/VolunteerStatistics';

import { FirestoreService } from '@/firebase/firestore/firestore-service';
import AuthGuardHOC from '@/hocs/auth-guard-hoc';

import Genders from '../../../public/svg/genders.svg';

export default AuthGuardHOC(() => {
  const [idx, setIdx] = useState(0);

  return (
    <div className='px-24'>
      <VolunteerHeader idx={idx} setIdx={setIdx} />
      <TabContent idx={idx} />
    </div>
  );
}, ['volunteer']);

const labels = [
  'My Statistics',
  'My Submissions',
  'All Submissions',
  'Found Persons',
];
function TabContent({ idx }: { idx: number }) {
  const user = useContext(UserContext);
  const g = useContext(GeneralModalContext);
  const c = useMemo(() => {
    const constraints: QueryConstraint[][] = [
      [],
      FirestoreService.getListingsConstraints({ createdBy: user?.id }),
      [],
      FirestoreService.getListingsConstraints({ status: 'found-alive' }),
    ];
    return constraints[idx];
  }, [idx, user?.id]);
  const { docs } = useCollectionPaginated('listings', 20, c);
  return (
    <div>
      {idx > 0 && <div className='text-2xl font-extrabold'>{labels[idx]}</div>}
      {idx === 0 ? (
        <VolunteerStatistics />
      ) : (
        <div>
          <div className='flex items-center overflow-hidden rounded-lg border'>
            <div className='ml-3'>
              <Genders />
            </div>
            <ReactSelect
              components={{
                DropdownIndicator: () => (
                  <AiFillCaretDown className='text-[#8EA696]' />
                ),
              }}
              placeholder='All Genders'
              className='min-w-[10rem]'
              classNames={{
                control: () => '!border-none',
                indicatorSeparator: () => '!hidden',
              }}
            />
            <div className=' mx-4 h-[30px] w-[1px] bg-[#BFD1C5]' />
            <div className='ml-3'>
              <IoLocation />
            </div>
            <ReactSelect
              components={{
                DropdownIndicator: () => (
                  <AiFillCaretDown className='text-[#8EA696]' />
                ),
              }}
              placeholder='All Locations'
              className='min-w-[10rem]'
              classNames={{
                control: () => '!border-none',
                indicatorSeparator: () => '!hidden',
              }}
            />
            <div className=' mx-4 h-[30px] w-[1px] bg-[#BFD1C5]' />
            <div className='ml-3'>
              <BsFillCalendarFill />
            </div>
            <ReactSelect
              components={{
                DropdownIndicator: () => (
                  <AiFillCaretDown className='text-[#8EA696]' />
                ),
              }}
              placeholder='Time Found'
              className='min-w-[10rem]'
              classNames={{
                control: () => '!border-none',
                indicatorSeparator: () => '!hidden',
              }}
            />
            <div className=' mx-4 h-[30px] w-[1px] bg-[#BFD1C5]' />
            <input
              className='flex-1'
              placeholder={`Search through ${labels[idx]}`}
            />
            <div className='mr-3'>
              <BsSearch />
            </div>
          </div>
          <div className='h-8' />
          <div className='grid grid-cols-5 gap-2'>
            {docs?.map((v, i) => (
              <ListingCard2
                onClick={() => {
                  g?.setContent(
                    <SubmissionView
                      onClose={() => g?.setIsOpen(false)}
                      listing={{ ...v.data(), _id: v.id }}
                    />,
                    'lg'
                  );
                  g?.setIsOpen(true);
                }}
                size='sm'
                key={i}
                listing={{ ...v.data(), _id: v.id }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
