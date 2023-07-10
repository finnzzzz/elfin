'use client';
import { Bakbak_One } from 'next/font/google';
import { TbLogout } from 'react-icons/tb';
import { MdAccountCircle } from 'react-icons/md';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import useStore from '@/app/user_store';

import { auth, authProvider } from '@/app/lib/firebase';
import { signInWithPopup, UserCredential, signOut } from 'firebase/auth';

import asyncSetUser from '@/app/api/user/asyncSetUser';
import { shallow } from 'zustand/shallow';

const font = Bakbak_One({ weight: '400', subsets: ['latin'] });

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

    console.log(userInfoFirestore.user.photoURL);
    await asyncSetUser(userInfoFirestore.user.uid, userInfoFirestore.user.displayName);

    login(
      userInfoFirestore.user.displayName,
      userInfoFirestore.user.uid,
      userInfoFirestore.user.photoURL as string
    );
  };

  const userLogout = async () => {
    await signOut(auth);
    logout();
  };
  return (
    <div className='bg-white flex h-full w-16 flex-col items-center justify-between gap-2 border border-gray-300'>
      <div className=' pt-4'>
        <Link className={`${font.className} text-xl text-blue-600  `} href='/'>
          elfin
        </Link>
      </div>
      {loginState ? (
        <>
          {/* <span className=' text-xs'>{userInfo.userName}</span> */}
          <div className=' flex flex-col items-center'>
            <Image
              src={userInfo.userImage}
              width={37}
              height={37}
              alt='image'
              quality={50}
              className=' mb-4 rounded-full border-2 border-blue-600'
            />
            {/* <button
              onClick={userLogout}
              className=' mb-4 w-fit rounded-sm border border-blue-700 p-1 text-xs'
            >
              logout
            </button> */}
            <button className=' mb-3' onClick={userLogout}>
              <TbLogout size='30px' stroke-width='1px' color='#5f5f5f' />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className=' flex flex-col items-center'>
            <button className=' mb-3' onClick={userlogin}>
              <MdAccountCircle size='37px' color='#c8c8c8' />
            </button>
            {/* <button
              onClick={userlogin}
              className=' w-fitc mb-4 rounded-md border border-blue-700 bg-white p-1'
            >
              login
            </button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
