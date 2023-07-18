import React from 'react';

import { PiBrowsersDuotone } from 'react-icons/pi';
import { PiTimerBold } from 'react-icons/pi';
import { MdAdsClick } from 'react-icons/md';
import { LuTextCursorInput } from 'react-icons/lu';
import { IoList } from 'react-icons/io5';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { TbTextRecognition } from 'react-icons/tb';
import { PiHandTap } from 'react-icons/pi';
import { PiHandSwipeRight } from 'react-icons/pi';
import { LuSend } from 'react-icons/lu';

const Toolbox = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className=' flex flex-col bg-white'>
      <div className='flex items-center justify-center gap-3  border-b border-r border-b-gray-300 border-r-gray-300 p-5 text-center text-lg font-bold text-blue-600 '>
        <span>
          <PiHandTap size='22px' />
        </span>
        <span>Drag to create</span>
        <span>
          <PiHandSwipeRight size='22px' />
        </span>
      </div>
      <aside className=' flex h-full w-[260px] flex-col items-center overflow-auto border-r  border-b-gray-300 p-5'>
        <div className='flex w-full flex-col gap-4 '>
          <div>
            <span className=' text-gray-700 text-lg'>Browser</span>
            <div className=' toolboxContainer'>
              <div
                className=' toolboxItem hover:border-customNileBlue-400 hover:text-customNileBlue-400'
                onDragStart={(event) => onDragStart(event, 'newTab')}
                draggable
              >
                <span>
                  <PiBrowsersDuotone size='24px' />
                </span>
                <span>New Tab</span>
              </div>
              <div
                className=' toolboxItem hover:border-customOrange-400 hover:text-customOrange-400'
                onDragStart={(event) => onDragStart(event, 'delay')}
                draggable
              >
                <span>
                  <PiTimerBold size='24px' />
                </span>
                Delay
              </div>
            </div>
          </div>
          <div>
            <span className=' text-gray-700 text-lg'>Interaction</span>
            <div className=' toolboxContainer'>
              <div
                className=' toolboxItem hover:border-customGreen-400 hover:text-customGreen-400'
                onDragStart={(event) => onDragStart(event, 'click')}
                draggable
              >
                <span>
                  <MdAdsClick size='22px' />
                </span>
                <span>Click</span>
              </div>
              <div
                className=' toolboxItem hover:border-customPurple-400 hover:text-customPurple-400'
                onDragStart={(event) => onDragStart(event, 'inputText')}
                draggable
              >
                <span>
                  <LuTextCursorInput size='24px' />
                </span>
                Text
              </div>
              <div
                className=' toolboxItem hover:border-customRed-400 hover:text-customRed-400'
                onDragStart={(event) => onDragStart(event, 'inputSelect')}
                draggable
              >
                <span>
                  <IoList size='24px' />
                </span>
                Select
              </div>
              <div
                className=' toolboxItem hover:border-customDarkYellow-400 hover:text-customDarkYellow-400'
                onDragStart={(event) => onDragStart(event, 'inputRadio')}
                draggable
              >
                <span>
                  <MdOutlineRadioButtonChecked size='22px' />
                </span>
                Radio
              </div>
              <div
                className=' toolboxItem hover:border-customPink-400 hover:text-customPink-400'
                onDragStart={(event) => onDragStart(event, 'inputCheckbox')}
                draggable
              >
                <span>
                  <IoMdCheckboxOutline size='22px' />
                </span>
                Checkbox
              </div>
              <div
                className=' toolboxItem hover:border-customDarkBlue-400 hover:text-customDarkBlue-400'
                onDragStart={(event) => onDragStart(event, 'enterSubmit')}
                draggable
              >
                <span>
                  <LuSend size='20px' />
                </span>
                Enter Submit
              </div>
            </div>
          </div>
          <div>
            <span className=' text-gray-700 text-lg'>Data</span>
            <div className=' toolboxContainer '>
              <div
                className=' toolboxItem hover:border-customDarkGreen-400 hover:text-customDarkGreen-400'
                onDragStart={(event) => onDragStart(event, 'getContent')}
                draggable
              >
                <span>
                  <TbTextRecognition size='24px' />
                </span>
                Get Text
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Toolbox;
