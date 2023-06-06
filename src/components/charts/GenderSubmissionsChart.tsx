import { BarCanvas } from '@nivo/bar';

export default function GenderSubmissionsChart() {
  return (
    <div className='flex-1 rounded-lg border p-4'>
      <div className='text-xl font-bold'>Submissions</div>
      <div className='relative'>
        <BarCanvas
          enableGridY={false}
          keys={['male', 'female']}
          enableLabel={false}
          borderRadius={6}
          colorBy='id'
          colors={({ id, data }) => data[`${id}Color`] as string}
          height={300}
          width={700}
          groupMode='grouped'
          padding={0.4}
          innerPadding={3}
          margin={{ bottom: 30, top: 30, right: 100, left: 30 }}
          data={[
            {
              id: 'JAN',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'FEB',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'MAR',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'APR',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'MAY',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'JUN',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'JUL',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'AUG',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'SEP',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'OCT',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'NOV',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: 'DEC',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
          ]}
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
    </div>
  );
}
