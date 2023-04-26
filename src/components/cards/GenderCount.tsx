import { useEffect, useState } from 'react';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function GenderCountCard() {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    const get = async () => {
      setMaleCount(
        (await FirestoreService.getGenderCount('male')).data().count
      );
      setFemaleCount(
        (await FirestoreService.getGenderCount('female')).data().count
      );
    };
    get();
  }, []);

  return (
    <div className='rounded-lg bg-white py-2 px-8 text-xl text-gray-600 shadow-lg'>
      <div>
        Total Male:{' '}
        <span className='text-2xl font-bold text-black'>{maleCount}</span>
      </div>
      <div>
        Total Female:{' '}
        <span className='text-2xl font-bold text-black'>{femaleCount}</span>
      </div>
    </div>
  );
}
