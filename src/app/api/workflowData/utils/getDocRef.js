import { doc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const getDocRef = (id) => doc(db, 'workflowtest', id);

export default getDocRef;
