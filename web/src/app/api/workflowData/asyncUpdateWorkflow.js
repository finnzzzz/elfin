import { serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const asyncUpdateWorkflow = async (uid, id = '', payload = {}) => {
  const workflowRef = doc(db, 'users', uid, 'scripts', id);
  const updateData = {
    saveTime: serverTimestamp(),
    ...payload,
  };
  return await updateDoc(workflowRef, updateData);
};

export default asyncUpdateWorkflow;
