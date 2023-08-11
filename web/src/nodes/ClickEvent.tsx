import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

import { MdAdsClick } from 'react-icons/md';

import useStore from '@/store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: Store) => ({
  setXPath: (e: inputEvent) => store.updateNode(id, { XPath: e.target.value }),
  setDescription: (e: inputEvent) => store.updateNode(id, { description: e.target.value }),
});

type clickObj = {
  label: 'Click';
  disable: boolean;
  XPath: string;
  description: string;
};

interface ClickEventProps {
  id: string;
  isConnectable: boolean;
  data: clickObj;
}

function ClickEvent({ id, isConnectable, data }: ClickEventProps) {
  const { setXPath, setDescription } = useStore(selector(id), shallow);

  const [stashXpath, setStashXpath] = useState(data.XPath);
  const [stashDescription, setStashDescription] = useState(data.description);

  const xpathChange = (e: inputEvent) => {
    setStashXpath(e.target.value);
  };

  const descriptionChange = (e: inputEvent) => {
    setStashDescription(e.target.value);
  };

  return (
    <ContextMenu id={id} color={'text-customGreen-400'}>
      <div
        className={`overflow-hidde w-[228px] overflow-hidden rounded-nodebase border border-customGreen-400 bg-white ${
          data.disable ? 'toggleOpacity' : ''
        } `}
      >
        <Handle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          className=' react-flow__handle-target after:border after:border-customGreen-400'
          style={{ left: '-8px', top: '81px' }}
        />
        <div className=' flex h-[57px] items-center justify-center border border-b-customGreen-400 bg-customGreen-50'>
          <div className=' flex items-center gap-2'>
            <span className=' text-customGreen-400'>
              <MdAdsClick size='24px' />
            </span>
            <div className=' text-2xl font-medium text-customGreen-400'>{data.label}</div>
          </div>
        </div>
        <div className=' pm-5 flex flex-col pb-5 pl-5 pr-5'>
          <input
            id='clickDescription'
            name='clickDescription'
            onChange={descriptionChange}
            value={stashDescription}
            onBlur={setDescription}
            placeholder='click for.....'
            maxLength={21}
            className='nodrag mt-3 rounded-sm text-center text-gray-400 outline-none focus:underline'
          />
          <label htmlFor='text' className=' mb-1 text-customGreen-500'>
            XPath：
          </label>
          <input
            type='text'
            value={stashXpath}
            onChange={xpathChange}
            onBlur={setXPath}
            className='nodrag rounded-md border border-customGreen-500 p-1 outline-none'
            placeholder='xpath.....'
          />
        </div>
        <Handle
          type='source'
          position={Position.Right}
          id='click'
          isConnectable={isConnectable}
          className=' react-flow__handle-source after:border after:border-customGreen-400'
          style={{ right: '-8px', top: '140px' }}
        />
      </div>
    </ContextMenu>
  );
}

export default ClickEvent;
