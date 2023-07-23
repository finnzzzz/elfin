import { ReactNode, useState } from 'react';
import { db } from '@/app/lib/firebase';
import {
  setDoc,
  getDocs,
  doc,
  collection,
} from 'firebase/firestore';

import elfinIcon from './icon128.png';
import googleIcon from './google.png';
import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';

import useStore from '@/app/user_store';

import asyncSetUser from '@/app/api/user/asyncSetUser';
import { auth, authProvider } from '@/app/lib/firebase';
import { signInWithPopup, UserCredential } from 'firebase/auth';

interface LoginProps {
  togglePop: () => void;
  seen: boolean;
}

const Login = ({ togglePop, seen }: LoginProps) => {
  const login = useStore((state) => state.login);

  const [isSignUp, setIsSignUp] = useState(true);

  const copyTemplateData = async (uid: string) => {
    try {
      const docRef = collection(db, 'users','lsqfNOGOJpUhpAPWpmLC8KIvCay2','scripts');
      const sourceSnapshot = await getDocs(docRef);

      sourceSnapshot.forEach(async (templateDoc) => {
        console.log(templateDoc.id, templateDoc.data());
        const data = templateDoc.data();

        const targetDocRef = collection(db, 'users', uid, 'scripts');
        const templateList = await getDocs(targetDocRef);

        if (!templateList.docs.length) {
          await setDoc(doc(db, 'users', uid, 'scripts', templateDoc.id), data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
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

    copyTemplateData(userInfoFirestore.user.uid);
  };

  const signUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <Modal togglePop={togglePop} seen={seen}>
        <div>
          <Image
            src={elfinIcon}
            width={45}
            height={45}
            quality={99}
            alt='elfin icon'
            className=' mb-6'
          />
          <div className=' mb-3'>
            <span className=' text-[28px] font-semibold leading-[28px]'>Get Started </span>
          </div>
          <div className=' flex flex-col gap-1'>
            {isSignUp && (
              <div className=' flex flex-col '>
                <span className=' text-base'>name</span>
                <input type='text' className=' h-[35px] rounded-lg border border-gray-300' />
              </div>
            )}
            <div className=' flex flex-col '>
              <span className=''>email</span>
              <input type='text' className=' h-[35px] rounded-lg border border-gray-300' />
            </div>
            <div className=' flex flex-col '>
              <span className=''>password</span>
              <input type='text' className=' h-[35px] rounded-lg border border-gray-300' />
            </div>
            {isSignUp ? (
              <div className=' mt-2 flex h-[40px] cursor-pointer items-center justify-center gap-1 rounded-lg bg-mainBlue-500'>
                <span className=' text-white '>Sign up</span>
              </div>
            ) : (
              <div className=' mt-2 flex h-[40px] cursor-pointer items-center justify-center gap-1 rounded-lg bg-mainBlue-500'>
                <span className=' text-white '>Sign in</span>
              </div>
            )}
            <span className='mt-1 text-end text-sm'>
              {isSignUp ? (
                <>
                  <span>Already have an account?</span>
                  <span className='ml-2 cursor-pointer underline' onClick={signUp}>
                    Sign in
                  </span>
                </>
              ) : (
                <>
                  <span>Don&apos;t have an account?</span>
                  <span className='ml-2 cursor-pointer underline' onClick={signUp}>
                    Sign up
                  </span>
                </>
              )}
            </span>
          </div>
          <hr className=' mt-5 w-full text-gray-900' />
          <div
            className=' mt-6 flex h-[40px] cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white'
            onClick={googleLogin}
          >
            <Image src={googleIcon} width={23} height={23} quality={90} alt='google signin' />
            <span>Sign in with Google</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;

interface ModalProps extends LoginProps {
  children: ReactNode;
}

const Modal = ({ togglePop, seen, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {seen && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.1,
              },
            }}
            exit={{
              opacity: 0,
            }}
            className='fixed left-0 top-0 h-full w-full bg-[#868686ae] '
          />
          <motion.div
            onClick={() => {
              togglePop();
            }}
            className='fixed flex h-full w-full items-center justify-center '
          >
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 1,
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              onClick={(e) => e.stopPropagation()}
              className=' w-[410px] rounded-[20px] bg-white p-[40px]'
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
