import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import { FaFemale, FaMale } from 'react-icons/fa';

import LastLocationChart from '@/components/charts/LastLocationChart';
import { UserContext } from '@/components/layout/GetAuthStatus';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

const AgeSubmissionsChartVolunteer = dynamic(
  () => import('../../charts/AgeSubmissionsChartVolunteer'),
  { ssr: false }
);

export default function VolunteerStatistics() {
  const user = useContext(UserContext);
  return (
    <div>
      <div className='text-2xl font-extrabold'>Hi {user?.username}</div>
      <div className='text-[#04261499]'>
        Let's show you how amazing you have been by showing you your impact on
        Wamirii.
      </div>
      <div className='h-8' />
      <div className='flex gap-4'>
        <div className='flex flex-1 flex-col gap-4'>
          <CountsRow />
          <AgeSubmissionsChartVolunteer />
        </div>
        <div className='flex w-[30rem] flex-col gap-4'>
          <MissingGenders />
          <LastLocationChart />
        </div>
      </div>
    </div>
  );
}

function CountsRow() {
  const [missingCardStats, setMissingCardStats] = useState({
    foundPersons: 0,
    missingPersons: 0,
  });

  useEffect(() => {
    const asyncRun = async () => {
      const foundPersons = await FirestoreService.getSubmissionCountWhere({
        status: 'found-alive',
      });
      const foundPersons2 = await FirestoreService.getSubmissionCountWhere({
        status: 'found-deceased',
      });
      const missingPersons = await FirestoreService.getSubmissionCountWhere({});
      setMissingCardStats({
        missingPersons: missingPersons.data().count,
        foundPersons: foundPersons.data().count + foundPersons2.data().count,
      });
    };
    asyncRun();
  }, []);

  return (
    <div className='flex justify-between gap-4'>
      <div className='flex flex-1 flex-col items-center rounded-lg bg-[#EDF8F1] py-8'>
        <div className='text-3xl font-extrabold'>
          {missingCardStats.missingPersons}
        </div>
        <div>Total Submissions</div>
      </div>
      <div className='flex flex-1 flex-col items-center rounded-lg bg-[#1A7836] py-8 text-white'>
        <div className='text-3xl font-extrabold'>
          {missingCardStats.foundPersons}
        </div>
        <div>Found Persons</div>
      </div>
      <div className='flex flex-1 flex-col items-center rounded-lg bg-[#FFF0F0] py-8'>
        <div className='text-3xl font-extrabold'>
          {missingCardStats.missingPersons}
        </div>
        <div>Total Missing Persons</div>
      </div>
    </div>
  );
}

function MissingGenders() {
  const [missingCardStats, setMissingCardStats] = useState({
    male: 0,
    female: 0,
  });

  useEffect(() => {
    const asyncRun = async () => {
      const female = (
        await FirestoreService.getSubmissionCountWhere({
          missingGender: 'female',
        })
      ).data().count;
      const male = (
        await FirestoreService.getSubmissionCountWhere({
          missingGender: 'male',
        })
      ).data().count;
      setMissingCardStats({
        male,
        female,
      });
    };
    asyncRun();
  }, []);

  return (
    <div className='flex flex-col justify-between gap-4 rounded-lg border border-[#F5F5F5] p-6'>
      <div className='flex items-center gap-4 rounded-lg bg-[#F4FAF6] p-5'>
        <div className='rounded-full bg-[#DBF2FF] p-4 text-[#1E749D]'>
          <FaMale className='h-10 w-10' />
        </div>
        <div>
          <div className='text-[#042614]'>Total No of Missing Males</div>
          <div className='text-2xl font-bold'>{missingCardStats.male}</div>
        </div>
      </div>
      <div className='flex items-center gap-4 rounded-lg bg-[#F4FAF6] p-5'>
        <div className='rounded-full bg-[#FFEED1] p-4 text-[#FBBA50]'>
          <FaFemale className='h-10 w-10' />
        </div>
        <div>
          <div className='text-[#042614]'>Total No of Missing Females</div>
          <div className='text-2xl font-bold'>{missingCardStats.female}</div>
        </div>
      </div>
    </div>
  );
}
