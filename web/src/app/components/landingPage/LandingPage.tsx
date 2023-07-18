import { useState } from 'react';
import Image from 'next/image';
import mainPic from './mainPicture.png';
import chromeIcon from './chromeIcon.png';

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
        <div className='flex h-full w-full  flex-col items-center p-7'>
          <span className=' self-end text-xl'>browser automation tool</span>
          <div className=' mt-24 flex items-center gap-2 text-5xl font-bold 2xl:mt-48'>
            <span>make</span>
            <span className=' title-browser-bg rounded-[10px]  p-2 pl-3 pr-3 text-mainBlue-500'>
              browser
            </span>
            <span>automation</span>
            <span className=' title-simple-bg rounded-full bg-orange-100 p-2 pl-5 pr-5 text-[#FF6914]'>
              simple
            </span>
          </div>
          <div className=' mt-12 2xl:mt-20'>
            <Image
              src={mainPic}
              width={1236}
              height={316}
              quality={90}
              className=' w-[1050px]'
              alt='landing page picture'
            />
          </div>
          <button className=' 2xl:mt-30 mt-20 text-xl hover:underline' onClick={togglePop}>
            sign in to start
          </button>
          <div className=' mr-5 mt-[5.5%] flex items-center self-end rounded-full border border-black p-3 text-base'>
            <Image
              src={chromeIcon}
              width={41}
              height={40}
              quality={90}
              className=' mr-2 w-[30px]'
              alt='download for chrome'
            />
            Download for Chrome
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
