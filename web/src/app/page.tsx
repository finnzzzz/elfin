'use client';

import asyncSetWorkflow from './api/workflowData/asyncSetWorkflow';

import useStore from '@/app/user_store';
import { shallow } from 'zustand/shallow';
import PersonalScriptList from './components/personalScriptList/PersonalScriptList';

export default function Home() {
  const userInfo = useStore((state) => state.userInfo, shallow);

  console.log('首頁');

  const addScript = (uid: string) => {
    asyncSetWorkflow(uid, {
      flow: { nodes: [], edges: [], viewport: { x: 0, y: 0, zoom: 1 } },
    });
    console.log('add');
  };

  return (
    <div className='p-5'>
      <div className=' mb-7 text-2xl text-slate-500'>hello world</div>
      <div className='text-3xl'>Template</div>
      <br />
      <br />
      <br />
      <br />
      {userInfo.isLogin ? (
        <>
          <div className=' text-2xl'>{userInfo.userName}的script</div>
          <button
            onClick={() => {
              addScript(userInfo.userUid);
            }}
            className=' rounded-md border border-blue-700 p-2'
          >
            Add new
          </button>
          <PersonalScriptList />
        </>
      ) : (
        <div>請先登入</div>
      )}
    </div>
  );
}
