import { addDoc, serverTimestamp } from 'firebase/firestore';
import { workflowCollectionDocRef } from '@/app/lib/firebase';

const asyncAddWorkflow = async ({ flow }) => {
  const docRef = await addDoc(workflowCollectionDocRef, {
    flow,
    saveTime: serverTimestamp(),
  });
  return docRef;
};

export default asyncAddWorkflow;
