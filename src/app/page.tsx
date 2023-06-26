'use client';

import Link from 'next/link';
import { db } from '@/app/lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import asyncSetWorkflow from './api/workflowData/asyncSetWorkflow';
import asyncDeleteWorkflow from './api/workflowData/asyncDeleteWorkflow';

export default function Home() {
  const workflowRef = collection(db, 'workflowtest');
  const q = query(workflowRef, orderBy('saveTime', 'desc'));
  const [workflowSnapShots, loading, error] = useCollection(q);

  const addScript = () => {
    asyncSetWorkflow({
      flow: { nodes: [], edges: [], viewport: { x: 0, y: 0, zoom: 1 } },
    });
    console.log('add');
  };

  const deleteScript = (id) => {
    asyncDeleteWorkflow(id);
    console.log('delete');
  };

  return (
    <div className='p-5'>
      <div className=' mb-7 text-3xl text-slate-500'>hello world</div>
      <button onClick={addScript} className=' rounded-md border border-blue-700 p-2'>
        Add new
      </button>
      <div className=' mt-4 text-xl'>All workflow</div>
      <div className=' flex flex-wrap gap-4'>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
        {workflowSnapShots?.docs
          ? workflowSnapShots.docs.map((item) => {
              const saveTimeSeconds = item.data().saveTime?.seconds;
              const saveTime = new Date(saveTimeSeconds * 1000).toLocaleString();
              return (
                <div className='flex flex-col' key={item.id}>
                  <button
                    onClick={() => {
                      deleteScript(item.id);
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
            })
          : 'nodata'}
      </div>
    </div>
  );
}
