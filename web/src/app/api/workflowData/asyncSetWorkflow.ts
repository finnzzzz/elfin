import { setDoc, addDoc, doc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const asyncSetWorkflow = async (uid: string) => {
  const workflowDoc = collection(db, 'users', uid, 'scripts');
  const docRef = await addDoc(workflowDoc, {
    id: '',
    name: 'none',
    flow: {
      nodes: [
        {
          id: 'start from this node',
          position: { x: 100, y: 100 },
          type: 'trigger',
          data: { label: 'Trigger', disable: false },
        },
      ],
      edges: [],
      viewport: {},
    },
    saveTime: serverTimestamp(),
  });

  const docId = docRef.id;
  await setDoc(
    doc(db, 'users', uid, 'scripts', docId),
    { id: docId, name: docId },
    { merge: true }
  );
  return docRef;
};

export default asyncSetWorkflow;
