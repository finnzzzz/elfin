'use client';
import icon from './icon48.png';

import { TbLogout } from 'react-icons/tb';
import { MdAccountCircle } from 'react-icons/md';
// import { RxInfoCircled } from 'react-icons/rx';
// import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineChrome } from 'react-icons/ai';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

  const router = useRouter();

  //解決hydration問題
  useEffect(() => {
    const storeLogin = userInfo.isLogin;
    setLoginState(storeLogin);
  }, [userInfo.isLogin]);

  const userlogin = async () => {
    const userInfoFirestore: UserCredential = await signInWithPopup(auth, authProvider);
    const extensionKey = crypto.randomUUID();
    localStorage.setItem('extensionKey', extensionKey);

    await asyncSetUser(
      userInfoFirestore.user.uid,
      userInfoFirestore.user.providerData[0].displayName,
      extensionKey
    );

    login(
      userInfoFirestore.user.providerData[0].displayName,
      userInfoFirestore.user.uid,
      userInfoFirestore.user.photoURL as string
    );
  };

  const userLogout = async () => {
    await signOut(auth);
    logout();
    localStorage.removeItem('extensionKey');
    router.push('/');
  };
  return (
    <div className='fixed flex h-full w-16 flex-col items-center justify-between gap-2 overflow-auto border  border-r-gray-300 bg-white'>
      <div className=' pt-4'>
        <Link href='/'>
          <Image
            src={icon}
            width={48}
            height={48}
            quality={100}
            className=' w-[35px]'
            alt='elfin icon'
          />
        </Link>
      </div>
      {loginState ? (
        <>
          <div className=' flex flex-col items-center'>
            <a
              href='https://chrome.google.com/webstore/detail/elfin-browser-automation/ojjgkgnnebfjcocfceidjnekcdamfjbf'
              target='_blank'
            >
              <button className=' mb-5 text-gray-400 hover:text-mainBlue-400'>
                <AiOutlineChrome size='28px' />
              </button>
            </a>
            {/* //TODO */}
            {/* <button className=' mb-5 text-gray-400'>
              <RxInfoCircled size='26px' />
            </button>
            <button className=' mb-5 text-gray-400'>
              <IoSettingsOutline size='26px' />
            </button> */}
            <Image
              src={userInfo.userImage}
              width={37}
              height={37}
              alt='image'
              quality={85}
              className=' mb-5 rounded-full border-2 border-blue-600 hover:animate-spin '
            />
            <button className=' mb-6 text-gray-400 hover:text-mainBlue-400' onClick={userLogout}>
              <TbLogout size='30px' stroke-width='1px' />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className=' flex flex-col items-center'>
            <button className=' mb-6' onClick={userlogin}>
              <MdAccountCircle size='37px' color='#c8c8c8' />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
