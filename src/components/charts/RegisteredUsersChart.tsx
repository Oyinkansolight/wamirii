import { RadialBar } from '@nivo/radial-bar';
import { useEffect, useState } from 'react';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function RegisteredUsersChart() {
  const [countUsers, setCountUsers] = useState({ volunteers: 0, users: 0 });
  useEffect(() => {
    const asyncRun = async () => {
      const volunteers = await FirestoreService.getUserCountWhere({
        role: 'volunteer',
      });
      const allUsers = await FirestoreService.getUserCountWhere({});
      setCountUsers({
        users: allUsers.data().count - volunteers.data().count,
        volunteers: volunteers.data().count,
      });
    };
    asyncRun();
  }, []);

  return (
    <div className='rounded-lg border p-4'>
      <div className='text-xl font-bold'>Registered Users</div>
      <div className='relative flex items-center justify-center'>
        <div className='absolute inset-0 flex items-center justify-center text-center'>
          <div>
            <div className='text-sm text-[#819289]'>Total No Of Users</div>
            <div className='text-xl font-bold'>
              {countUsers.users + countUsers.volunteers}
            </div>
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
                  y: countUsers.volunteers,
                },
                {
                  color: '#FEBD38',
                  x: 'Standalone Users',
                  y: countUsers.users,
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
