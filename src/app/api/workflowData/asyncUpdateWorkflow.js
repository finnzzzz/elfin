import { serverTimestamp, updateDoc } from 'firebase/firestore';
import getDocRef from './utils/getDocRef';

const asyncUpdateTodo = async (id = '', payload = {}) => {
  const workflowRef = getDocRef(id);
  const updateData = {
    saveTime: serverTimestamp(),
    ...payload,
  };
  return await updateDoc(workflowRef, updateData);
};

export default asyncUpdateTodo;
