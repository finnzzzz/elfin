import List from './List';
import { useState } from 'react';

const Home = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || '');

  const setToken = () => {
    localStorage.setItem('userToken', '1DK9kKHiK3ZePLTo0x2Kyfx6Qut1');
    setUserToken('1DK9kKHiK3ZePLTo0x2Kyfx6Qut1');
  };

  console.log('rerender');

  const goElfin = () => {
    window.open('https://elfin.vercel.app/');
  };

  return (
    <div className=' flex h-full justify-end'>
      <div className=' flex w-[350px] flex-col items-center pb-3 pt-8 font-semibold background-image-blue relative'>
        <div
          onClick={goElfin}
          className=' text-2xl mb-5 font-bakbak text-mainBlue-500 hover:underline cursor-pointer'
        >
          elfin
        </div>

        {userToken ? (
          <List />
        ) : (
          <>
            <div>請先登入</div>
            <button onClick={setToken} className=' border border-sky-400 p-2 rounded-md'>
              登入
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
