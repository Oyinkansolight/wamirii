export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = false;
export const isStaging = true;
export const firebaseConfig = isStaging
  ? {
      apiKey: 'AIzaSyCYdhlSI_unFxqw2ambWtaclps-KbPNqNg',
      authDomain: 'wamirii-staging.firebaseapp.com',
      projectId: 'wamirii-staging',
      storageBucket: 'wamirii-staging.appspot.com',
      messagingSenderId: '1056519370167',
      appId: '1:1056519370167:web:b1de1ce64551da4fe96432',
      measurementId: 'G-HNX08FFPT8',
    }
  : {
      apiKey: 'AIzaSyBISBfDPTdwbDYzn1mKznbnBzOUJrxM6no',
      authDomain: 'wamirii.firebaseapp.com',
      projectId: 'wamirii',
      storageBucket: 'wamirii.appspot.com',
      messagingSenderId: '1024495080366',
      appId: '1:1024495080366:web:b5b30019294ac27038ae3f',
      measurementId: 'G-J3PT36LXB3',
    };

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;
