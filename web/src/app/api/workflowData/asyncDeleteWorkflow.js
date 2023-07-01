import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const asyncDeleteWorkflow = async (uid = '', id) => {
  const workflowDoc = doc(db, 'users', uid, 'scripts', id);
  const workflowRef = await deleteDoc(workflowDoc);
  return workflowRef;
};

export default asyncDeleteWorkflow;
