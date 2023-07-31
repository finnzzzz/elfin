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
      <div className=' fixed left-0 top-0 z-50 h-full w-full bg-white'>
        <Login togglePop={togglePop} seen={seen} />
        <div className='flex h-full w-full  flex-col items-center p-9 lg:p-7'>
          <span className=' self-end text-lg sm:text-xl'>browser automation tool</span>
          <div className=' mt-24 flex flex-col items-center gap-2 text-3xl font-bold sm:flex-row lg:text-5xl 2xl:mt-48'>
            <span>make</span>
            <span className=' title-browser-bg rounded-[10px] p-1  pl-3 pr-3 text-mainBlue-500 sm:p-2'>
              browser
            </span>
            <span>automation</span>
            <span className=' title-simple-bg rounded-full bg-orange-100 p-1 pl-5 pr-5 text-[#FF6914] sm:p-2'>
              simple
            </span>
          </div>
          <div className=' mt-12 2xl:mt-20'>
            <Image
              src={mainPic}
              width={1236}
              height={316}
              quality={95}
              className=' w-[1050px]'
              alt='landing page picture'
            />
          </div>
          <button className=' mt-28 text-xl hover:underline sm:mt-32' onClick={togglePop}>
            sign in to start
          </button>

          <div className=' mr-5 mt-[15px] flex items-center rounded-full border border-black p-2 text-base sm:mt-[5.5%] sm:self-end sm:p-3'>
            <Image
              src={chromeIcon}
              width={41}
              height={40}
              quality={85}
              className=' mr-2 w-[18px] sm:w-[30px]'
              alt='download for chrome'
            />
            <a
              className=' hover:underline'
              href='https://chrome.google.com/webstore/detail/elfin-browser-automation/ojjgkgnnebfjcocfceidjnekcdamfjbf'
              target='_blank'
            >
              Download for Chrome
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
