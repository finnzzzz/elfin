import { useState, memo } from 'react';
import './utils/style/style.css';

import { PiTimerBold } from 'react-icons/pi';

import { Handle, Position } from 'reactflow';
import useStore from '../store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setDelayTime: (e: inputEvent) => store.updateNode(id, { delayTime: e.target.value }),
  setDescription: (e: inputEvent) => store.updateNode(id, { description: e.target.value }),
});

type delayObj = {
  label: 'Delay';
  disable: boolean;
  delayTime: string;
  description: string;
};

interface DelayEventProps {
  id: string;
  isConnectable: boolean;
  data: delayObj;
}

const DelayEvent = ({ id, isConnectable, data }: DelayEventProps) => {
  const { setDelayTime, setDescription } = useStore(selector(id), shallow);

  const [stashTime, setStashTime] = useState(data.delayTime);
  const [stashDescription, setStashDescription] = useState(data.description);

  const timeChange = (e:inputEvent) => {
    setStashTime(e.target.value);
  };

  const descriptionChange = (e:inputEvent) => {
    setStashDescription(e.target.value);
  };

  return (
    <>
      <ContextMenu id={id} color={'text-customOrange-400'}>
        <div
          className={`overflow-hidde h-[174px] w-[200px] overflow-hidden rounded-nodebase border border-customOrange-400 bg-white ${
            data.disable ? 'toggleOpacity' : ''
          } `}
        >
          <Handle
            type='target'
            position={Position.Left}
            isConnectable={isConnectable}
            className=' react-flow__handle-target after:border after:border-customOrange-400'
            style={{
              left: '-8px',
              top: '81px',
            }}
          />
          <div className=' flex h-[33%] items-center justify-center border border-b-customOrange-400 bg-customOrange-50'>
            <div className=' flex items-center gap-2'>
              <span className=' text-customOrange-400'>
                <PiTimerBold size='24px' stroke-width='2px' />
              </span>
              <div className=' text-2xl font-medium text-customOrange-400'>{data.label}</div>
            </div>
          </div>
          <div className=' flex flex-col pl-5 pr-5'>
            <input
              id='text'
              name='text'
              onChange={descriptionChange}
              value={stashDescription}
              onBlur={setDescription}
              maxLength={18}
              placeholder='waiting for.....'
              className='nodrag mt-3 rounded-sm text-center text-gray-400 outline-none focus:underline'
            />
            <label htmlFor='text' className=' mb-1 text-customOrange-500'>
              Time：
            </label>
            <input
              id='text'
              name='text'
              onChange={timeChange}
              value={stashTime}
              onBlur={setDelayTime}
              className='nodrag rounded-md border border-customOrange-500 p-1 outline-none'
              placeholder='2000ms'
            />
          </div>
          <Handle
            type='source'
            position={Position.Right}
            id='delay'
            isConnectable={isConnectable}
            className=' react-flow__handle-source after:border after:border-customOrange-400'
            style={{ right: '-8px', top: '140px' }}
          />
        </div>
      </ContextMenu>
    </>
  );
};

export default memo(DelayEvent);
