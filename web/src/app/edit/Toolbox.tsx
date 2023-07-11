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

const Toolbox = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className=' flex flex-col border border-r-gray-300 bg-white'>
      <div className='flex items-center gap-3 justify-center p-5 text-center text-lg font-bold text-blue-600'>
        <span>
          <PiHandTap size='22px' />
        </span>
        <span>Drag to create</span>
        <span>
          <PiHandSwipeRight size='22px' />
        </span>
      </div>
      <aside
        className=' flex w-[250px] flex-col items-center overflow-auto p-3
    '
      >
        <div className='flex w-full flex-col gap-4 '>
          <div>
            <span>Browser</span>
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
            <span>Interaction</span>
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
            </div>
          </div>
          <div>
            <span>Data</span>
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
        {/* <div
        className='node border-orange-400'
        onDragStart={(event) => onDragStart(event, 'click')}
        draggable
      >
        click
      </div> */}
        {/* {nodes?.map((node) => (
        <div key={node.id}>
          Node {node.id} <br /> x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)}
          <br />
          type:{node.type}, data_CSS:{node.data?.CSS}
        </div>
      ))} */}
        {/* {edges?.map((edges) => (
        <div key={edges.id} className=' text-xs'>
          {edges.id}
        </div>
      ))} */}
      </aside>
    </div>
  );
};

export default Toolbox;
