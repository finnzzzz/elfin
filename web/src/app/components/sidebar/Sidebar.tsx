'use client';
import icon from './icon48.png';

import { IoLogOutOutline } from 'react-icons/io5';
import { MdAccountCircle } from 'react-icons/md';
// import { RxInfoCircled } from 'react-icons/rx';
// import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineChrome } from 'react-icons/ai';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useStore from '@/app/user_store';

import { auth } from '@/app/lib/firebase';
import { signOut } from 'firebase/auth';

import { shallow } from 'zustand/shallow';

const Sidebar = () => {
  const userInfo = useStore((state) => state.userInfo, shallow);
  const logout = useStore((state) => state.logout, shallow);

  const router = useRouter();

  const userLogout = async () => {
    await signOut(auth);
    logout();
    localStorage.removeItem('extensionKey');
    router.push('/');
  };
  return (
    <div className='fixed z-40 flex h-14 w-full flex-row items-center justify-between gap-2 border border-r-gray-300 bg-white p-2  md:fixed md:h-full  md:w-16 md:flex-col'>
      <div className='pl-3 md:pl-0 md:pt-4'>
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
      <div className=' flex flex-row items-center gap-3 md:flex-col md:gap-0'>
        <a
          href='https://chrome.google.com/webstore/detail/elfin-browser-automation/ojjgkgnnebfjcocfceidjnekcdamfjbf'
          target='_blank'
        >
          <button className='hidden text-gray-400 hover:text-mainBlue-400 md:mb-5 md:block'>
            <AiOutlineChrome className=' text-3xl' />
          </button>
        </a>
        {/* //TODO */}
        {/* <button className=' mb-5 text-gray-400'>
              <RxInfoCircled size='26px' />
            </button>
            <button className=' mb-5 text-gray-400'>
              <IoSettingsOutline size='26px' />
            </button> */}
        {userInfo.userImage !== '' ? (
          <Image
            src={userInfo.userImage}
            width={37}
            height={37}
            alt='image'
            quality={93}
            className=' rounded-full border-2 border-blue-600 md:mb-5 '
          />
        ) : (
          <span className=' rounded-full border-2 border-blue-400 text-mainBlue-300 md:mb-5'>
            <MdAccountCircle className=' h-8 w-8' />
          </span>
        )}
        <button
          className='pr-3 text-gray-400 hover:text-mainBlue-400 md:mb-6 md:pr-0'
          onClick={userLogout}
        >
          <IoLogOutOutline className=' text-3xl ' />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
