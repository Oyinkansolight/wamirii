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
    id: `${5 * i} - ${5 * i + 5} Years`,
    female: 0,
    male: 0,
    maleColor: '#BECAC3',
    femaleColor: '#042614',
  }));

export default function AgeSubmissionsChart() {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const asyncRun = async () => {
      setIsLoading(true);
      const newData = [...defaultData];
      for (let i = 0; i < 12; i++) {
        const male = (
          await getCountFromServer(
            query(
              collection(db, 'listings'),
              where('missingGender', '==', 'male'),
              where('missingAge', '>=', i * 5),
              where('missingAge', '<', i * 5 + 5)
            )
          )
        ).data().count;
        const female = (
          await getCountFromServer(
            query(
              collection(db, 'listings'),
              where('missingGender', '==', 'female'),
              where('missingAge', '>=', i * 5),
              where('missingAge', '<', i * 5 + 5)
            )
          )
        ).data().count;
        newData[i].male = male;
        newData[i].female = female;
      }
      setData(newData);
      setIsLoading(false);
    };
    asyncRun();
  }, []);

  return (
    <div className='relative rounded-lg border p-4'>
      <div className='text-xl font-bold'>Age Range of Missing Persons</div>
      <div className='relative'>
        <Bar
          enableGridY={false}
          keys={['male', 'female']}
          enableLabel={false}
          borderRadius={6}
          colorBy='id'
          colors={({ id, data }) =>
            data[`${id}Color` as keyof (typeof defaultData)[number]] as string
          }
          height={300}
          width={1080}
          groupMode='grouped'
          padding={0.6}
          innerPadding={8}
          margin={{ bottom: 30, top: 30, right: 100, left: 30 }}
          data={data}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
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
