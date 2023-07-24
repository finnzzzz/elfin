'use client';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase';
import useStore from '@/app/user_store';

const AuthProvider = () => {
  const [user, loading, _error] = useAuthState(auth);

  const userLogin = useStore((state) => state.login);

  const setUserData = async () => {
    try {
      if (user) {
        const { displayName, photoURL } = user.providerData[0];
        photoURL
          ? userLogin(displayName, user.uid, photoURL)
          : userLogin(displayName, user.uid, '');
      } else {
        useStore.setState({
          userInfo: { userName: 'none', userUid: 'no login', userImage: '', isLogin: false },
        });
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  useEffect(() => {
    if (loading) return;
    setUserData();
  }, [user, loading]);

  return null;
};

export default AuthProvider;
