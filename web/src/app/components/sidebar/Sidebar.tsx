'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import useStore from '@/app/user_store';

import { auth, authProvider } from '@/app/lib/firebase';
import { signInWithPopup, UserCredential, signOut } from 'firebase/auth';

import asyncSetUser from '@/app/api/user/asyncSetUser';
import { shallow } from 'zustand/shallow';

const Sidebar = () => {
  const [loginState, setLoginState] = useState(false);

  const userInfo = useStore((state) => state.userInfo, shallow);
  const logout = useStore((state) => state.logout, shallow);
  const login = useStore((state) => state.login, shallow);

  //解決hydration問題
  useEffect(() => {
    const storeLogin = userInfo.isLogin;
    setLoginState(storeLogin);
  }, [userInfo.isLogin]);

  const userlogin = async () => {
    const userInfoFirestore: UserCredential = await signInWithPopup(auth, authProvider);

    console.log(userInfoFirestore.user);
    await asyncSetUser(userInfoFirestore.user.uid, userInfoFirestore.user.displayName);

    login(userInfoFirestore.user.displayName, userInfoFirestore.user.uid);
  };

  const userLogout = async () => {
    await signOut(auth);
    logout();
  };
  return (
    <div className='flex h-full w-16 flex-col items-center justify-between gap-2 border border-blue-900 bg-blue-100'>
      <div className=' pt-4'>
        <Link href='/'>home</Link>
      </div>
      {loginState ? (
        <>
          {/* <span className=' text-xs'>{userInfo.userName}</span> */}
          <div className='flex flex-col items-center'>
            <Image
              src='https://lh3.googleusercontent.com/a/AAcHTtfu3WzqzIOI7COtgrDZj8FsIEpchm89vRlr6laB=s96-c'
              width={40}
              height={40}
              alt='image'
              quality={50}
              className=' mb-3 rounded-full'
            />
            <button
              onClick={userLogout}
              className=' mb-4 w-fit rounded-sm border border-blue-700 p-1 text-xs'
            >
              logout
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={userlogin}
          className=' w-fitc mb-4 rounded-md border border-blue-700 bg-white p-1'
        >
          login
        </button>
      )}
    </div>
  );
};

export default Sidebar;
