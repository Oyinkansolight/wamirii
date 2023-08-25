import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';

import { allStates } from '@/constant/generic';
import { FirestoreService } from '@/firebase/firestore/firestore-service';

import Data from './topology.json';

export default function LastLocationChart() {
  const [low, setLow] = useState<{ name: string }[]>([]);
  const [mid, setMid] = useState<{ name: string }[]>([]);
  const [high, setHigh] = useState<{ name: string }[]>([]);
  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    plotOptions: {
      map: {
        allAreas: false,
        joinBy: ['name', 'name'],
        dataLabels: {
          enabled: true,
          color: '#FFFFFF',
          style: {
            fontWeight: 'bold',
          },
        },
        tooltip: {
          headerFormat: '',
          pointFormat: '{point.name}: <b>{series.name}</b>',
        },
      },
    },
    chart: { map: Data },
    series: [
      {
        data: high,
        color: 'red',
        name: 'High',
        type: 'map',
        joinBy: ['name', 'name'],
      },
      {
        data: mid,
        color: '#FBBA50',
        name: 'Medium',
        type: 'map',
        joinBy: ['name', 'name'],
      },
      {
        data: low,
        color: '#ABCDB7',
        name: 'Low',
        type: 'map',
        joinBy: ['name'],
      },
    ],
  };

  useEffect(() => {
    const run = async () => {
      const h: { name: string }[] = [];
      const m: { name: string }[] = [];
      const l: { name: string }[] = [];
      await Promise.all(
        allStates.map(async (v) => {
          const count = (
            await FirestoreService.getSubmissionCountWhere({
              missingLastSeenSate: v.name,
            })
          ).data().count;
          if (count > 10) {
            h.push(v);
          } else if (count > 0) {
            m.push(v);
          } else {
            l.push(v);
          }
        })
      );
      setHigh(h);
      setMid(m);
      setLow(l);
    };
    run();
  }, []);

  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    return (
      <div className='rounded-lg border border-[#F5F5F5] p-4'>
        <div className='text-xl font-bold'>Locations with Missing People</div>
        <HighchartsReact
          constructorType='mapChart'
          highcharts={Highcharts}
          options={options}
        />
      </div>
    );
  } else {
    return <div>Data Not Available</div>;
  }
}
