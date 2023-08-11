import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const asyncSetUser = async (uid: string, userName: string | null, extensionKey: string) => {
  const userDoc = doc(db, 'users', uid);
  const docRef = await setDoc(
    userDoc,
    {
      name: userName,
      id: uid,
      loginTime: serverTimestamp(),
      extensionKey,
    },
    { merge: true }
  );
  return docRef;
};

export default asyncSetUser;