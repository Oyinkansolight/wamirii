import { useEffect, useState } from 'react';

import DashboardInfoCard from '@/components/cards/DashboardInfoCard';

import { FirestoreService } from '@/firebase/firestore/firestore-service';

export default function MissingPersonsCards() {
  const [missingCardStats, setMissingCardStats] = useState({
    foundPersons: 0,
    foundPersonsPercent: 0,
    missingPersons: 0,
    missingPersonsPercent: 0,
    missingFemales: 0,
    missingFemalesPercent: 0,
    missingMales: 0,
    missingMalesPercent: 0,
  });

  useEffect(() => {
    const asyncRun = async () => {
      // const month = moment().month();
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
      // const missingPersonsMonth = (
      //   await FirestoreService.getSubmissionCountWhereOp([], month)
      // ).data().count;
      // const missingPersonsLastMonth = (
      //   await FirestoreService.getSubmissionCountWhereOp([], month - 1)
      // ).data().count;
      setMissingCardStats({
        missingFemales: missingFemales.data().count,
        missingMales: missingMales.data().count,
        missingPersons: missingPersons.data().count,
        foundPersons: foundPersons.data().count + foundPersons2.data().count,
        foundPersonsPercent: 0,
        missingFemalesPercent: 0,
        missingMalesPercent: 0,
        missingPersonsPercent: 0,
      });
    };
    asyncRun();
  }, []);

  const s = [
    {
      n: missingCardStats.foundPersons,
      subText: 'Found Persons',
      percent: missingCardStats.foundPersonsPercent,
    },
    {
      n: missingCardStats.missingPersons,
      subText: 'Total Missing Persons',
      percent: missingCardStats.missingPersonsPercent,
    },
    {
      n: missingCardStats.missingMales,
      subText: 'Missing Males',
      percent: missingCardStats.missingMalesPercent,
    },
    {
      n: missingCardStats.missingFemales,
      subText: 'Missing Females',
      percent: missingCardStats.missingFemalesPercent,
    },
  ];
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
      {Array(4)
        .fill(0)
        .map((v, i) => (
          <DashboardInfoCard key={i} {...s[i]} variant={i} />
        ))}
    </div>
  );
}
