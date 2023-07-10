'use client';
import { useState, useEffect } from 'react';

import asyncSetWorkflow from './api/workflowData/asyncSetWorkflow';

import { HiPlus } from 'react-icons/hi';

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
    asyncSetWorkflow(uid);
    console.log('add');
  };

  return (
    <div className='w-full p-5'>
      <div className=' mb-7 text-2xl text-slate-500'>hello world</div>
      <div className='mb-[30px] text-2xl text-gray-800'>Template</div>
      <div className=' mb-7 h-[180px] w-full rounded-sm bg-gray-100'></div>
      <hr className='mb-5 w-full border-gray-400' />
      {loginState ? (
        <>
          <div className=' mb-7 text-2xl'>{userInfo.userName} s scripts</div>
          <button
            onClick={() => {
              addScript(userInfo.userUid);
            }}
            className=' mb-3 flex items-center rounded-md border border-blue-200 bg-[#0D99FF] p-3 text-white'
          >
            <span className=' leading-[15px]'>New script</span>
            <span className=' ml-1'>
              <HiPlus size='15px' />
            </span>
          </button>
          <PersonalScriptList />
        </>
      ) : (
        <div>請先登入</div>
      )}
    </div>
  );
}
