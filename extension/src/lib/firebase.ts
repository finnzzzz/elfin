import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';

export const WORKFLOW_COLLECTION_NAME = 'workflowtest';

const firebaseConfig = {
  apiKey: 'AIzaSyBIUKY_6VUG5IqEEUaMmkQOWcAOCpGPWFg',
  authDomain: 'project-1397079608692204932.firebaseapp.com',
  projectId: 'project-1397079608692204932',
  storageBucket: 'project-1397079608692204932.appspot.com',
  messagingSenderId: '82950943242',
  appId: '1:82950943242:web:6d387f3d410f54e52f65f3',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const workflowCollectionDocRef = collection(db, WORKFLOW_COLLECTION_NAME);
