import Link from 'next/link';
import { db } from '@/app/lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import asyncDeleteWorkflow from '@/app/api/workflowData/asyncDeleteWorkflow';

import useStore from '@/app/user_store';

const PersonalScriptList = () => {
  const userInfo = useStore((state) => state.userInfo);

  let uid = userInfo.userUid;

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
      <div>PersonalScriptList</div>
      <div className=' flex flex-wrap gap-4'>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
        {workflowSnapShots?.docs.map((item) => {
          const saveTimeSeconds = item.data().saveTime?.seconds;
          const saveTime = new Date(saveTimeSeconds * 1000).toLocaleString();
          return (
            <div className='flex flex-col' key={item.id}>
              <button
                onClick={() => {
                  deleteScript(userInfo.userUid, item.id);
                }}
              >
                delete
              </button>
              <Link href={`/edit/${item.id}`}>
                <div className=' flex w-[250px] flex-col items-center rounded-lg border border-blue-500 bg-slate-200 p-3'>
                  <span className=' mb-2'>{item.data().name}</span>
                  <span className=' mb-2'>{item.data().id}</span>
                  <span>上次修改時間：{saveTime}</span>
                </div>
              </Link>
            </div>
          );
        })}
        {workflowSnapShots?.docs.length == 0 && <div>no scripts</div>}
      </div>
    </>
  );
};

export default PersonalScriptList;
