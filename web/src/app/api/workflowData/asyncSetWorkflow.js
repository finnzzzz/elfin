import { setDoc, addDoc, doc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const asyncSetWorkflow = async (uid, { flow }) => {
  const workflowDoc = collection(db, 'users', uid, 'scripts');
  const docRef = await addDoc(workflowDoc, {
    id: '',
    name: 'none',
    flow,
    saveTime: serverTimestamp(),
  });

  const docId = docRef.id;
  await setDoc(doc(db, 'users', uid, 'scripts', docId), { id: docId }, { merge: true });
  return docRef;
};

export default asyncSetWorkflow;
