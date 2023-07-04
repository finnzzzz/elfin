'use client';

import { useState, useEffect } from 'react';

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

  let userInfoFirestore;

  const userlogin = async () => {
    const userInfoFirestore: UserCredential = await signInWithPopup(auth, authProvider);
    console.log('userInfoFirestore', userInfoFirestore);

    console.log(userInfoFirestore.user.uid);
    await asyncSetUser(userInfoFirestore.user.uid, userInfoFirestore.user.displayName);

    login(userInfoFirestore.user.displayName, userInfoFirestore.user.uid);
  };

  const userLogout = async () => {
    await signOut(auth);
    console.log('userInfoFirestore', userInfoFirestore);
    logout();
  };
  return (
    <div className='flex h-full w-16 flex-col items-center gap-2 border border-blue-900 bg-blue-100'>
      <div>
        <Link href='/'>home</Link>
      </div>
      {loginState ? (
        <>
          <span>{userInfo.userName}</span>
          <button onClick={userLogout} className=' w-fit rounded-sm border border-blue-700 p-1'>
            logout
          </button>
        </>
      ) : (
        <button onClick={userlogin} className=' w-fit rounded-sm border border-blue-700 p-1'>
          login
        </button>
      )}
    </div>
  );
};

export default Sidebar;
