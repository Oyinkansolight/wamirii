import { BarCanvas } from '@nivo/bar';

export default function AgeSubmissionsChart() {
  return (
    <div className=' rounded-lg border p-4'>
      <div className='text-xl font-bold'>Age Range of Missing Persons</div>
      <div className='relative'>
        <BarCanvas
          enableGridY={false}
          keys={['male', 'female']}
          enableLabel={false}
          borderRadius={6}
          colorBy='id'
          colors={({ id, data }) => data[`${id}Color`] as string}
          height={300}
          width={1200}
          groupMode='grouped'
          padding={0.6}
          innerPadding={8}
          margin={{ bottom: 30, top: 30, right: 100, left: 30 }}
          data={[
            {
              id: '0-5 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '5-10 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '10-15 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '15-20 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '20-25 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '25-30 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '30-35 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '35-40 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '40-45 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '45-50 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '50-55 Years',
              female: 200,
              male: 300,
              maleColor: '#BECAC3',
              femaleColor: '#042614',
            },
            {
              id: '55-60 Years',
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
