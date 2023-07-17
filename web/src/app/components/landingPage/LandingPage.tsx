import { useState } from 'react';
import Image from 'next/image';
import mainPic from './mainPicture.png';

import Login from '../login/Login';

const LandingPage = () => {
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }

  return (
    <>
      <div className=' fixed left-0 top-0 h-full w-full bg-white'>
        <Login togglePop={togglePop} seen={seen} />
        <div className='flex h-full w-full  flex-col items-center p-5'>
          <span className=' self-end text-xl'>browser automation tool</span>
          <div className=' mt-[10.5%] flex items-center gap-2 text-5xl font-bold'>
            <span>make</span>
            <span className=' title-browser-bg rounded-[10px]  p-2 pl-3 pr-3 text-mainBlue-500'>
              browser
            </span>
            <span>automation</span>
            <span className=' title-simple-bg rounded-full bg-orange-100 p-2 pl-5 pr-5 text-[#FF6914]'>
              simple
            </span>
          </div>
          <div className=' mt-[6%]'>
            <Image
              src={mainPic}
              width={1236}
              height={316}
              quality={87}
              className=' w-[1050px]'
              alt='landing page picture'
            />
          </div>
          <button className=' mt-[150px] text-xl hover:underline' onClick={togglePop}>
            sign in to start
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
