'use client';
import { Bakbak_One } from 'next/font/google';

import { useState, useEffect } from 'react';

import asyncSetWorkflow from './api/workflowData/asyncSetWorkflow';

import { HiPlus } from 'react-icons/hi';

import user_useStore from '@/app/user_store';
import { shallow } from 'zustand/shallow';
import PersonalScriptList from './components/personalScriptList/PersonalScriptList';
import LandingPage from './components/landingPage/LandingPage';
import TemplateScripts from './components/templateScripts/TemplateScripts';

const font = Bakbak_One({ weight: '400', subsets: ['latin'] });

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
    <>
      {loginState ? (
        <div className='w-full p-5 pt-[60px]'>
          <span className=' absolute right-[20px] top-[20px]'>
            <div className=' flex flex-col items-end'>
              {/* <span className={` ${font.className} text-xl leading-5 text-gray-400 `}>elfin</span> */}
              <span className=' font-bold text-gray-400'>Browser automation tool</span>
            </div>
          </span>
          <div className=' mb-7 text-2xl text-slate-800'>
            👋🏻 Welcome !
            <span className='ml-2 text-2xl font-semibold text-mainBlue-500'>
              {userInfo.userName}
            </span>
          </div>
          <div className=' mb-[20px] text-[24px] text-gray-700'>Template</div>
          <TemplateScripts />
          <hr className='mb-8 mt-[50px] w-full border-gray-300' />
          {loginState ? (
            <>
              <div className=' mb-7 text-[20px] text-gray-700'>
                {userInfo.userName}&#39; scripts
              </div>
              <button
                onClick={() => {
                  addScript(userInfo.userUid);
                }}
                className=' mb-4 flex items-center rounded-md border border-blue-200 bg-[#68a6f8] hover:bg-[#0d99ff] p-3 text-white'
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
      ) : (
        <LandingPage />
      )}
    </>
  );
}
