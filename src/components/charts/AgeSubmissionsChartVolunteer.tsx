import { Bar } from '@nivo/bar';
import {
  collection,
  getCountFromServer,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Loading from '@/components/generic/Loading';

import { db } from '@/firebase/init';

const defaultData = Array(12)
  .fill(0)
  .map((v, i) => ({
    id: `${5 * i} - ${5 * i + 5}`,
    count: 0,
    countColor: '#042614',
  }));

export default function AgeSubmissionsChartVolunteer() {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const asyncRun = async () => {
      setIsLoading(true);
      const newData = [...defaultData];
      for (let i = 0; i < 12; i++) {
        const c = (
          await getCountFromServer(
            query(
              collection(db, 'listings'),
              where('missingAge', '>=', i * 5),
              where('missingAge', '<', i * 5 + 5)
            )
          )
        ).data().count;
        newData[i].count = c;
      }
      setData(newData);
      setIsLoading(false);
    };
    asyncRun();
  }, []);

  return (
    <div className='relative rounded-lg border border-[#F5F5F5] p-4'>
      <div className='text-xl font-bold'>Age Range of Missing Persons</div>
      <div className='relative overflow-hidden overflow-x-scroll'>
        <Bar
          enableGridY={false}
          keys={['count']}
          enableLabel={false}
          borderRadius={6}
          colorBy='id'
          colors={({ id, data }) =>
            data[`${id}Color` as keyof (typeof defaultData)[number]] as string
          }
          height={300}
          width={800}
          groupMode='grouped'
          padding={0.8}
          innerPadding={8}
          margin={{ bottom: 30, top: 30, right: 100, left: 30 }}
          data={data}
        />
      </div>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-[#00000016]'>
          <Loading />
        </div>
      )}
    </div>
  );
}
