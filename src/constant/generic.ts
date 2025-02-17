export const allStates = [
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
    name: 'FEDERAL CAPITAL TERRITORY',
  },
].map((v) => ({
  name:
    v.name !== 'FEDERAL CAPITAL TERRITORY'
      ? `${v.name[0]}${v.name.slice(1).toLocaleLowerCase()}`
      : 'Federal Capital Territory',
}));

// eslint-disable-next-line unused-imports/no-unused-vars
const removeDark = /`(dark:.*?)[\w\d\-:]*`/gi;

export const roles = <const>[
  'admin',
  'user',
  'organization',
  'manager',
  'volunteer',
];

export const statuses = <const>['active', 'inactive'];

export const status = <const>[
  'active',
  'duplicate',
  'found-alive',
  'found-deceased',
  'inactive',
];

export const reporterRelationship = <const>[
  'parent',
  'relative',
  'spouse/partner',
  'aquaintance',
  'stranger',
];

export const channel = <const>[
  'instagram',
  'twitter',
  'whatsapp',
  'nairaland',
  'facebook',
  'tiktok',
  'other',
];
