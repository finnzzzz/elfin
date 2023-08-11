'use client';
// ---------------------------------------React
import { useEffect, useState } from 'react';
// ---------------------------------------firebase
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import asyncUpdateWorkflow from '../../api/workflowData/asyncUpdateWorkflow';
// ---------------------------------------Components
import EditPage from '../../../components/editPage/EditPage';
// ---------------------------------------Zustand
import useStore from '@/store';
import user_useStore from '@/user_store';
// ---------------------------------------Next
import { useRouter } from 'next/navigation';
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
  const [isFetchingGlobalState, setIsFetchingGlobalState] = useState<boolean>(true);

  const router = useRouter();

  const scriptName = useStore((state) => state.scriptName);
  const saveTime = useStore((state) => state.saveTime);

  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const setViewport = useStore((state) => state.setViewport);
  const setScriptName = useStore((state) => state.setScriptName);
  const setSaveTime = useStore((state) => state.setSaveTime);

  const userInfo = user_useStore((state) => state.userInfo);

  const data = async () => {
    if (workflow?.id == '') {
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
        if (userInfo.userUid !== 'no login') {
          alert('not your script');
          router.push('/');
          return;
        }
        alert('login to start');
      }
    }
  };

  const saveName = async (uid: string, id: string, e: React.FocusEvent<HTMLInputElement>) => {
    let name = e.target.value;
    if (name === '') {
      setScriptName('NaN');
      name = 'NaN';
    }
    await asyncUpdateWorkflow(uid, id, { name });
  };

  useEffect(() => {
    if (!isFetchingGlobalState) {
      data();
    }
  }, [isFetchingGlobalState]);

  useEffect(() => {
    if (userInfo.userUid === '0000') {
      setIsFetchingGlobalState(true);
    } else {
      setIsFetchingGlobalState(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (isFetchingGlobalState) return;
    if (userInfo?.isLogin === false) {
      router.push('/');
    }
  }, [isFetchingGlobalState, userInfo]);

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='relative flex flex-col items-center justify-center border-b border-b-gray-300 p-2 md:p-3'>
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
        <div className=' bottom-1 right-4 text-sm md:absolute'>
          <span className=' mr-2 text-gray-500'>last saved</span>
          <span className=' text-gray-500'>{saveTime}</span>
        </div>
      </div>
      {loading && (
        <div className=' absolute z-20 flex h-full w-full items-center justify-center bg-[#838383a2]'>
          <div className='text-3xl font-medium text-blue-600'>loading......</div>
        </div>
      )}
      <EditPage id={workflow?.id} />
    </div>
  );
};

export default Edit;
