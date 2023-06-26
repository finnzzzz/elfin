'use client';

import Link from 'next/link';
import { auth, authProvider } from '@/app/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const login = async () => {
    await signInWithPopup(auth, authProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div className='flex h-full w-16 flex-col items-center gap-2 border border-blue-900 bg-blue-100'>
      <div>
        <Link href='/'>home</Link>
      </div>
      {user ? (
        <>
          <span>{user.displayName}</span>
          <button
            onClick={logout}
            className=' w-fit rounded-sm border border-blue-700 p-1'
          >
            logout
          </button>
        </>
      ) : (
        <button onClick={login} className=' w-fit rounded-sm border border-blue-700 p-1'>
          login
        </button>
      )}
    </div>
  );
};

export default Sidebar;
