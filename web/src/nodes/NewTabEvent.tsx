import { useState, ChangeEvent } from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '@/store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

import { PiBrowsersDuotone } from 'react-icons/pi';

const selector = (id: string) => (store: Store) => ({
  setURL: (e: ChangeEvent<HTMLInputElement>) => store.updateNode(id, { url: e.target.value }),
  setDescription: (e: ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { description: e.target.value }),
});

type newTabObj = {
  label: 'NewTab';
  disable: boolean;
  url: string;
  description: string;
  isConnectable: boolean;
  maxConnections: number;
};

interface NewTabProps {
  id: string;
  isConnectable: boolean;
  data: newTabObj;
}

const NewTabEvent = ({ id, data }: NewTabProps) => {
  const { setURL, setDescription } = useStore(selector(id), shallow);
  const { isConnectable } = data;
  const [stashUrl, setStashUrl] = useState(data.url);
  const [stashDescription, setStashDescription] = useState(data.description);

  const urlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStashUrl(e.target.value);
  };

  const descriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStashDescription(e.target.value);
  };

  return (
    <ContextMenu id={id} color={'text-customNileBlue-400'}>
      <div
        className={`overflow-hidde h-[174px] w-[228px] overflow-hidden rounded-nodebase border border-customNileBlue-400 bg-white ${
          data.disable ? 'toggleOpacity' : ''
        } `}
      >
        <Handle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          className=' react-flow__handle-target after:border after:border-customNileBlue-400'
          style={{ left: '-8px', top: '81px' }}
        />
        <div className=' flex h-[33%] items-center justify-center border border-b-customNileBlue-400 bg-customNileBlue-50'>
          <div className=' flex items-center gap-2'>
            <span className=' text-customNileBlue-400'>
              <PiBrowsersDuotone size='24px' />
            </span>
            <div className=' text-2xl font-medium text-customNileBlue-400'>{data.label}</div>
          </div>
        </div>
        <div className=' flex flex-col pl-5 pr-5'>
          <input
            id='clickDescription'
            name='clickDescription'
            onChange={descriptionChange}
            value={stashDescription}
            onBlur={setDescription}
            maxLength={21}
            placeholder='newTab for.....'
            className='nodrag mt-3 rounded-sm text-center text-gray-400 outline-none focus:underline'
          />
          <label htmlFor='text' className=' mb-1 text-customNileBlue-500'>
            URL：
          </label>
          <input
            id='text'
            name='text'
            onChange={urlChange}
            value={stashUrl}
            onBlur={setURL}
            className='nodrag rounded-md border border-customNileBlue-500 p-1 outline-none'
            placeholder='https://.....'
          />
        </div>
        <Handle
          type='source'
          position={Position.Right}
          id='newTab'
          isConnectable={isConnectable}
          className=' react-flow__handle-source after:border after:border-customNileBlue-400'
          style={{ right: '-8px', top: '140px' }}
        />
      </div>
    </ContextMenu>
  );
};

export default NewTabEvent;
