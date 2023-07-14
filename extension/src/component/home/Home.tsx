import List from './List';
import { useState } from 'react';

import { PiHandTap } from 'react-icons/pi';

const Home = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem('extensionKey') || '');

  console.log('rerender');

  const goElfin = () => {
    window.open('https://elfin.vercel.app/');
  };

  const userlogin = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id as number;
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        func: () => {
          const newExtensionKey = localStorage.getItem('extensionKey');
          if (newExtensionKey) {
            console.log('Current localStorage extensionKey:', newExtensionKey);
            chrome.runtime.sendMessage({
              command: 'setExtensionKey',
              data: { newExtensionKey },
            });
          } else {
            alert('請先在網頁中登入');
            console.log('Current localStorage does not have extensionKey');
          }
        },
        args: [],
      });
    });
  };

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.command == 'setkey') {
      localStorage.setItem('extensionKey', msg.data);
      setUserToken(msg.data);
    }
  });

  return (
    <div className=' flex h-full justify-end'>
      <div className=' flex w-[330px] flex-col items-center pb-3 pt-6 font-semibold background-image-blue relative'>
        <div
          onClick={goElfin}
          className=' text-2xl font-bakbak text-mainBlue-500 hover:underline cursor-pointer mb-4'
        >
          elfin
        </div>

        {userToken ? (
          <List key={userToken} />
        ) : (
          <>
            <span className='mb-4'>
              <PiHandTap size='30px' />
            </span>
            <span className=' text-base mb-1 '>Please log in on the elfin page first</span>
            <span className=' text-xs mb-3 '>
              connect the extension under the window of the website
            </span>
            <button
              onClick={userlogin}
              className=' border border-blue-400 p-2 mb-3 rounded-md bg-white'
            >
              connect
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
