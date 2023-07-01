import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const asyncSetUser = async (uid: string, userName: string) => {
  const userDoc = doc(db, 'users', uid);
  const docRef = await setDoc(
    userDoc,
    {
      name: userName,
      id: uid,
      loginTime: serverTimestamp(),
    },
    { merge: true }
  );
  return docRef;
};

export default asyncSetUser;