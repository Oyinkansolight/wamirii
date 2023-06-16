import { useEffect, useState } from 'react';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function UsersCountCard() {
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const get = async () => {
      setUsersCount((await FirestoreService.getUsersCount()).data().count);
    };
    get();
  }, []);

  return (
    <div className='flex items-center rounded-lg bg-white py-2 px-8 text-xl text-gray-600  shadow-lg'>
      <div className='text-black'>
        Total Users: <span className='text-2xl font-bold'>{usersCount}</span>
      </div>
    </div>
  );
}
