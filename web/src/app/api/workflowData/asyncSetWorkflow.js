import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { workflowCollectionDocRef } from '@/app/lib/firebase';

const asyncSetWorkflow = async ({ flow }) => {
  const workflowDoc = doc(workflowCollectionDocRef);
  const docRef = await setDoc(workflowDoc, {
    id: workflowDoc.id,
    name: 'none',
    flow,
    saveTime: serverTimestamp(),
  });
  return docRef;
};

export default asyncSetWorkflow;
