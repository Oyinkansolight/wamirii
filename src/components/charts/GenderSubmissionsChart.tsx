import { Bar } from '@nivo/bar';
import moment from 'moment';
import { useEffect, useState } from 'react';

import Loading from '@/components/generic/Loading';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const maleColor = '#BECAC3';
const femaleColor = '#042614';

const defaultData = months.map((v) => ({
  id: v,
  female: 0,
  male: 0,
  maleColor,
  femaleColor,
}));

export default function GenderSubmissionsChart() {
  const [data, setData] = useState<
    {
      id: string;
      female: number;
      male: number;
      maleColor: string;
      femaleColor: string;
    }[]
  >(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const asyncRun = async () => {
      setIsLoading(true);
      const newData = [...defaultData];
      const m = moment();
      m.day(1);
      for (let i = 0; i <= m.month(); i++) {
        const newM = moment();
        newM.day(1);
        newM.month(i);
        const format = newM.format('MMMM YYYY');
        const male = (
          await FirestoreService.getSubmissionCountWhere(
            { missingGender: 'male' },
            format
          )
        ).data().count;
        const female = (
          await FirestoreService.getSubmissionCountWhere(
            { missingGender: 'female' },
            format
          )
        ).data().count;
        newData[i].female = female;
        newData[i].male = male;
      }
      setData(newData);
      setIsLoading(false);
    };
    asyncRun();
  }, []);

  return (
    <div className='relative flex-1 rounded-lg border p-4'>
      <div className='text-xl font-bold'>Submissions</div>
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
          width={700}
          groupMode='grouped'
          padding={0.4}
          innerPadding={3}
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
