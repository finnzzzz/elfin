import { deleteDoc } from 'firebase/firestore';
import getDocRef from './utils/getDocRef';

const asyncDeleteWorkflow = async (id = '') => {
  //    await deleteDoc(getDocRef(id));
  const workflowDoc = await getDocRef(id);
  const workflowRef = await deleteDoc(workflowDoc);
  return workflowRef;
};

export default asyncDeleteWorkflow;
