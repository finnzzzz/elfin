import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

export const WORKFLOW_COLLECTION_NAME = 'workflowtest';
export const USER_COLLECTION_NAME = 'users';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'project-1397079608692204932.firebaseapp.com',
  projectId: 'project-1397079608692204932',
  storageBucket: 'project-1397079608692204932.appspot.com',
  messagingSenderId: '82950943242',
  appId: '1:82950943242:web:6d387f3d410f54e52f65f3',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const workflowCollectionDocRef = collection(db, WORKFLOW_COLLECTION_NAME);
export const userCollectionDocRef = collection(db, USER_COLLECTION_NAME);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();
