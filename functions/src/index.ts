import * as functions from 'firebase-functions';

import { onCreateUserHandler } from './user/on-create';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

export const onCreateUser = functions.auth.user().onCreate(onCreateUserHandler);
