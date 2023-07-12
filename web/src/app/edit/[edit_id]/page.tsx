'use client';
// ---------------------------------------React
import { useEffect, useState, useCallback } from 'react';
// ---------------------------------------firebase
import { db } from '@/app/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import asyncUpdateWorkflow from '../../api/workflowData/asyncUpdateWorkflow';
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

  const scriptName = useStore((state) => state.scriptName);
  const saveTime = useStore((state) => state.saveTime);

  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const setViewport = useStore((state) => state.setViewport);
  const setScriptName = useStore((state) => state.setScriptName);
  const setSaveTime = useStore((state) => state.setSaveTime);

  const userInfo = user_useStore((state) => state.userInfo);

  //用獲取到的id去獲取firestore上的資料，只在首次沒有資料的時候
  const data = async () => {
    if (workflow.id == '') {
      const docRef = doc(db, 'users', userInfo.userUid, 'scripts', edit_id);

      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        setWorkflow(docSnap.data() as IWorkflow);
        setNodes(docSnap.data()?.flow?.nodes);
        setEdges(docSnap.data()?.flow?.edges);
        setViewport(docSnap.data()?.flow?.viewport);
        setScriptName(docSnap.data()?.name);
        setSaveTime(
          new Date(docSnap.data()?.saveTime.seconds * 1000).toLocaleString('zh-TW', {
            hour12: false,
          })
        );
        setLoading(false);
      } else {
        alert('not yours');
      }
    }
  };

  useEffect(() => {
    data();
    console.log(workflow);
    console.log(scriptName);
  });

  const saveName = useCallback(async (uid: string, id: string, e) => {
    //儲存到firestore
    const name = e.target.value;
    const addedRes = await asyncUpdateWorkflow(uid, id, { name });
    console.log(addedRes);
  }, []);

  return (
    <>
      <div className='flex h-full w-full flex-col'>
        <div className='relative flex items-center justify-center border-b border-b-gray-300 p-3'>
          <input
            type='text'
            value={scriptName}
            onChange={(e) => {
              setScriptName(e.target.value);
            }}
            onBlur={(e) => {
              saveName(userInfo.userUid, workflow?.id, e);
            }}
            className=' w-[250px] text-center text-gray-700 outline-none focus:italic focus:underline'
          />
          <div className=' absolute bottom-1 right-4 text-sm'>
            <span className=' mr-2 text-gray-500'>last saved</span>
            <span className=' text-gray-500'>{saveTime}</span>
          </div>
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
