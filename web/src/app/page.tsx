'use client';
import { useState, useEffect } from 'react';

import asyncSetWorkflow from './api/workflowData/asyncSetWorkflow';

import user_useStore from '@/app/user_store';
import { shallow } from 'zustand/shallow';
import PersonalScriptList from './components/personalScriptList/PersonalScriptList';

export default function Home() {
  const userInfo = user_useStore((state) => state.userInfo, shallow);

  const [loginState, setLoginState] = useState(false);

  //解決hydration問題
  useEffect(() => {
    const storeLogin = userInfo.isLogin;
    setLoginState(storeLogin);
  }, [userInfo.isLogin]);

  console.log('首頁');

  const addScript = (uid: string) => {
    asyncSetWorkflow(uid, {
      flow: { nodes: [], edges: [], viewport: { x: 0, y: 0, zoom: 1 } },
    });
    console.log('add');
  };

  return (
    <div className='w-full p-5'>
      <div className=' mb-7 text-2xl text-slate-500'>hello world</div>
      <div className='text-3xl'>Template</div>
      <br />
      <br />
      <br />
      <br />
      <hr className='mb-5 w-full border-gray-400' />
      {loginState ? (
        <>
          <div className=' mb-2 text-2xl'>{userInfo.userName}的script</div>
          <button
            onClick={() => {
              addScript(userInfo.userUid);
            }}
            className=' mb-5 rounded-md border border-blue-700 p-2'
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
