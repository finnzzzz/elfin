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
import user_useStore from '@/app/user_store';

// ---------------------------------------types
interface EditProps {
  params: { edit_id: string };
}

interface IWorkflow {
  flow: object;
  id: string;
  name: '';
  saveTime: string;
}
// ---------------------------------------

const Edit = ({ params }: EditProps) => {
  //獲取網址中的id
  const { edit_id } = params;
  const [loading, setLoading] = useState(true);
  const [workflow, setWorkflow] = useState<IWorkflow>({
    flow: {},
    id: '',
    name: '',
    saveTime: '',
  });
  const [date, setDate] = useState('');
  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const setViewport = useStore((state) => state.setViewport);

  const userInfo = user_useStore((state) => state.userInfo);

  //用獲取到的id去獲取firestore上的資料，只在首次沒有資料的時候
  const data = async () => {
    if (workflow.id == '') {
      const docRef = doc(db, 'users', userInfo.userUid, 'scripts', edit_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        setWorkflow(docSnap.data() as IWorkflow);
        setDate(new Date(docSnap.data()?.saveTime.seconds * 1000).toLocaleString());
        // console.log(docSnap.data());
        setNodes(docSnap.data()?.flow?.nodes);
        setEdges(docSnap.data()?.flow?.edges);
        setViewport(docSnap.data()?.flow?.viewport);
        setLoading(false);
      } else {
        alert('not yours');
      }
    }
  };

  useEffect(() => {
    data();
    console.log(workflow);
  });

  return (
    <>
      <div className='flex h-full w-full flex-col'>
        <div className='flex items-center justify-center '>
          <div>Editpage----</div>
          <div>ID：{workflow?.id}----</div>
          <div>Name：{workflow?.name}----</div>
          <div>SaveTime：{date}</div>
        </div>
        {loading && (
          <div className=' absolute z-20 flex h-full w-full items-center justify-center bg-[#83838374]'>
            <div className='text-3xl'>loading...</div>
          </div>
        )}
        <EditPage id={workflow?.id} />
      </div>
    </>
  );
};

export default Edit;
