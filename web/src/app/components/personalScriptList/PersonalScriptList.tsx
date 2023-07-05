import Link from 'next/link';
import { db } from '@/app/lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import asyncDeleteWorkflow from '@/app/api/workflowData/asyncDeleteWorkflow';

import useStore from '@/app/user_store';

const PersonalScriptList = () => {
  const userInfo = useStore((state) => state.userInfo);

  const uid = userInfo.userUid;

  const userRef = collection(db, 'users', uid, 'scripts');
  const q = query(userRef, orderBy('saveTime', 'desc'));
  const [workflowSnapShots, loading, error] = useCollection(q);

  console.log('psl', workflowSnapShots?.docs);

  const deleteScript = (uid: string, id: string) => {
    asyncDeleteWorkflow(uid, id);
    console.log('delete');
  };
  return (
    <>
      <div className=' mb-4'>PersonalScriptList</div>
      <div className=' flex flex-wrap gap-4'>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
        {workflowSnapShots?.docs.map((item) => {
          const saveTimeSeconds = item.data().saveTime?.seconds;
          const saveTime = new Date(saveTimeSeconds * 1000).toLocaleString();
          return (
            <div className='flex flex-col items-end' key={item.id}>
              <button
                onClick={() => {
                  deleteScript(userInfo.userUid, item.id);
                }}
                className=' mb-1 w-fit rounded-md border border-red-300 bg-red-100 p-1 text-sm '
              >
                delete
              </button>
              <Link href={`/edit/${item.id}`}>
                <div className=' flex h-[100px] w-[250px] flex-col items-center rounded-lg border border-blue-500 bg-slate-200 p-3'>
                  <span className=' mb-2 text-xl'>{item.data().name}</span>
                  <span className=' mb-2 text-sm'>{item.data().id}</span>
                </div>
              </Link>
              <span className=' text-xs'>Edited：{saveTime}</span>
            </div>
          );
        })}
        {workflowSnapShots?.docs.length == 0 && <div>no scripts</div>}
      </div>
    </>
  );
};

export default PersonalScriptList;
