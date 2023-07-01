'use client';

import Link from 'next/link';
import useStore from '@/app/user_store';

import { auth, authProvider } from '@/app/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import asyncSetUser from '@/app/api/user/asyncSetUser';
import { shallow } from 'zustand/shallow';

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const userInfo = useStore((state) => state.userInfo, shallow);
  const logout = useStore((state) => state.logout, shallow);
  const login = useStore((state) => state.login, shallow);

  const userlogin = async () => {
    const userInfo = await signInWithPopup(auth, authProvider);
    console.log(user);
    console.log(userInfo.user.uid);
    await asyncSetUser(userInfo.user.uid, userInfo.user.displayName);

    login(userInfo.user.displayName!, userInfo.user.uid!);
  };

  const userLogout = async () => {
    await signOut(auth);
    console.log(user);
    logout();
  };
  return (
    <div className='flex h-full w-16 flex-col items-center gap-2 border border-blue-900 bg-blue-100'>
      <div>
        <Link href='/'>home</Link>
      </div>
      {userInfo.isLogin ? (
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
