import { useEffect, useState } from 'react';

import DashboardInfoCard from '@/components/cards/DashboardInfoCard';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function MissingPersonsCards() {
  const [missingCardStats, setMissingCardStats] = useState({
    foundPersons: 0,
    missingPersons: 0,
    missingFemales: 0,
    missingMales: 0,
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
      const missingFemales = await FirestoreService.getSubmissionCountWhere({
        missingGender: 'female',
      });

      const missingMales = await FirestoreService.getSubmissionCountWhere({
        missingGender: 'male',
      });
      setMissingCardStats({
        missingFemales: missingFemales.data().count,
        missingMales: missingMales.data().count,
        missingPersons: missingPersons.data().count,
        foundPersons: foundPersons.data().count + foundPersons2.data().count,
      });
    };
    asyncRun();
  }, []);

  const s = [
    {
      n: missingCardStats.foundPersons,
      subText: 'Found Persons',
      percent: 10,
    },
    {
      n: missingCardStats.missingPersons,
      subText: 'Total Missing Persons',
      percent: -10,
    },
    {
      n: missingCardStats.missingMales,
      subText: 'Missing Males',
      percent: 10,
    },
    {
      n: missingCardStats.missingFemales,
      subText: 'Missing Females',
      percent: 10,
    },
  ];
  return (
    <div className='flex justify-between gap-6'>
      {Array(4)
        .fill(0)
        .map((v, i) => (
          <DashboardInfoCard key={i} {...s[i]} variant={i} />
        ))}
    </div>
  );
}
