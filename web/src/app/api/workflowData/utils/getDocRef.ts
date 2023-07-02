import { doc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const getDocRef = (id:string) => doc(db, 'workflowtest', id);

export default getDocRef;
