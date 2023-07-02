import { addDoc, serverTimestamp } from 'firebase/firestore';
import { workflowCollectionDocRef } from '@/app/lib/firebase';

const asyncAddWorkflow = async ({ flow }: { flow: Flow }) => {
  const docRef = await addDoc(workflowCollectionDocRef, {
    flow,
    saveTime: serverTimestamp(),
  });
  return docRef;
};

export default asyncAddWorkflow;
