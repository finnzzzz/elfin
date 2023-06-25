import { updateDoc } from 'firebase/firestore';
import getDocRef from './utils/getDocRef';

const asyncUpdateTodo = async (id = '', payload = {}) => {
  const todoItemRef = getDocRef([id]);
  return await updateDoc(todoItemRef, payload);
};

export default asyncUpdateTodo;
