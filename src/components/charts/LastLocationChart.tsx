import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

import Data from './topology.json';

const d1 = [
  {
    id: '1',
    name: 'ABIA',
  },
  {
    id: '2',
    name: 'ADAMAWA',
  },
  {
    id: '3',
    name: 'AKWA IBOM',
  },
  {
    id: '4',
    name: 'ANAMBRA',
  },
  {
    id: '5',
    name: 'BAUCHI',
  },
  {
    id: '6',
    name: 'BAYELSA',
  },
  {
    id: '7',
    name: 'BENUE',
  },
  {
    id: '8',
    name: 'BORNO',
  },
  {
    id: '9',
    name: 'CROSS RIVER',
  },
  {
    id: '10',
    name: 'DELTA',
  },
].map((v) => ({ name: `${v.name[0]}${v.name.slice(1).toLocaleLowerCase()}` }));

const d2 = [
  {
    id: '11',
    name: 'EBONYI',
  },
  {
    id: '12',
    name: 'EDO',
  },
  {
    id: '13',
    name: 'EKITI',
  },
  {
    id: '14',
    name: 'ENUGU',
  },
  {
    id: '15',
    name: 'GOMBE',
  },
  {
    id: '16',
    name: 'IMO',
  },
  {
    id: '17',
    name: 'JIGAWA',
  },
  {
    id: '18',
    name: 'KADUNA',
  },
  {
    id: '19',
    name: 'KANO',
  },
  {
    id: '20',
    name: 'KATSINA',
  },
].map((v) => ({ name: `${v.name[0]}${v.name.slice(1).toLocaleLowerCase()}` }));

const d3 = [
  {
    id: '21',
    name: 'KEBBI',
  },
  {
    id: '22',
    name: 'KOGI',
  },
  {
    id: '23',
    name: 'KWARA',
  },
  {
    id: '24',
    name: 'LAGOS',
  },
  {
    id: '25',
    name: 'NASARAWA',
  },
  {
    id: '26',
    name: 'NIGER',
  },
  {
    id: '27',
    name: 'OGUN',
  },
  {
    id: '28',
    name: 'ONDO',
  },
  {
    id: '29',
    name: 'OSUN',
  },
  {
    id: '30',
    name: 'OYO',
  },
  {
    id: '31',
    name: 'PLATEAU',
  },
  {
    id: '32',
    name: 'RIVERS',
  },
  {
    id: '33',
    name: 'SOKOTO',
  },
  {
    id: '34',
    name: 'TARABA',
  },
  {
    id: '35',
    name: 'YOBE',
  },
  {
    id: '36',
    name: 'ZAMFARA',
  },
  {
    id: '37',
    name: 'Federal Capital Territory',
  },
].map((v) => ({
  name:
    v.name !== 'Federal Capital Territory'
      ? `${v.name[0]}${v.name.slice(1).toLocaleLowerCase()}`
      : v.name,
}));

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
      data: d1,
      color: 'red',
      name: 'High',
      type: 'map',
      joinBy: ['name', 'name'],
    },
    {
      data: d2,
      color: '#FBBA50',
      name: 'Medium',
      type: 'map',
      joinBy: ['name', 'name'],
    },
    {
      data: d3,
      color: '#ABCDB7',
      name: 'Low',
      type: 'map',
      joinBy: ['name'],
    },
  ],
};

export default function LastLocationChart() {
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
