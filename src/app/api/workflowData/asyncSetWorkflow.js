import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { workflowCollectionDocRef } from '../../lib/firebase';

const asyncAddWorkflow = async ({ flow }) => {
  const workflowDoc = doc(workflowCollectionDocRef);
  const docRef = await setDoc(workflowDoc, {
    id: workflowDoc.id,
    flow,
    created: serverTimestamp(),
  });
  return docRef;
};

export default asyncAddWorkflow;
