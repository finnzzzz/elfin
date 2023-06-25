import { addDoc, serverTimestamp } from 'firebase/firestore';
import { workflowCollectionDocRef } from '../../lib/firebase';

const asyncAddWorkflow = async ({ flow }) => {
  const docRef = await addDoc(workflowCollectionDocRef, {
    flow,
    created: serverTimestamp(),
  });
  return docRef;
};

export default asyncAddWorkflow;
