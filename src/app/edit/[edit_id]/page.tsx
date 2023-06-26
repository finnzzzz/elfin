'use client';
// ---------------------------------------React
import { useEffect, useState } from 'react';
// ---------------------------------------firebase
import { db } from '@/app/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
// ---------------------------------------Components
import EditPage from '../EditPage';
// ---------------------------------------Zustand
import useStore from '@/app/store';

// ---------------------------------------types
interface EditProps {
  params: { edit_id: string };
}
// ---------------------------------------

const Edit = ({ params }: EditProps) => {
  //獲取網址中的id
  const { edit_id } = params;
  const [workflow, setWorkflow] = useState('');
  const [date, setDate] = useState('');
  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const setViewport = useStore((state) => state.setViewport);

  //用獲取到的id去獲取firestore上的資料，只在首次沒有資料的時候
  const data = async () => {
    if (workflow.length == 0) {
      const docRef = doc(db, 'workflowtest', edit_id);
      const docSnap = await getDoc(docRef);
      setWorkflow(docSnap.data());
      setDate(new Date(docSnap.data()?.saveTime.seconds * 1000).toLocaleString());
      // console.log(docSnap.data());
      setNodes(docSnap.data()?.flow?.nodes);
      setEdges(docSnap.data()?.flow?.edges);
      setViewport(docSnap.data()?.flow?.viewport);
    }
  };

  useEffect(() => {
    data();
    console.log(workflow);
  });

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex items-center justify-center '>
        <div>Editpage----</div>
        <div>ID：{workflow?.id}----</div>
        <div>Name：{workflow?.name}----</div>
        <div>SaveTime：{date}</div>
      </div>
      <EditPage id={workflow?.id} />
    </div>
  );
};

export default Edit;
