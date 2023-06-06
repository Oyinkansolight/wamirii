import { RadialBar } from '@nivo/radial-bar';

export default function RegisteredUsersChart() {
  return (
    <div className='rounded-lg border p-4'>
      <div className='text-xl font-bold'>Registered Users</div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center justify-center text-center'>
          <div>
            <div className='text-sm text-[#819289]'>Total No Of Users</div>
            <div className='text-xl font-bold'>20,000</div>
          </div>
        </div>
        <RadialBar
          startAngle={-90}
          endAngle={90}
          innerRadius={0.6}
          radialAxisStart={null}
          borderWidth={5}
          colors={(v) => v.data.color}
          borderColor='white'
          margin={{ top: 30, right: 30, bottom: 0, left: 30 }}
          data={[
            {
              id: '#',
              data: [
                {
                  color: '#F25F33',
                  x: 'Volunteers',
                  y: 512,
                },
                {
                  color: '#FEBD38',
                  x: 'Standalone Users',
                  y: 175,
                },
              ],
            },
          ]}
          height={300}
          width={300}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 0,
              itemsSpacing: 6,
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              symbolSize: 18,
              symbolShape: 'square',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
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
