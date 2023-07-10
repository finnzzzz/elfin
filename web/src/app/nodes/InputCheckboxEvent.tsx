import { useState } from 'react';
import { Handle, Position } from 'reactflow';

import { IoMdCheckboxOutline } from 'react-icons/io';

import useStore from '../store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setXPath: (e: inputEvent) => store.updateNode(id, { XPath: e.target.value }),
  setDescription: (e: inputEvent) => store.updateNode(id, { description: e.target.value }),
});

type inputObj = {
  label: 'Input';
  disable: boolean;
  value: string;
  XPath: string;
  description: string;
  inputType: string;
};

interface ClickEventProps {
  id: string;
  isConnectable: boolean;
  data: inputObj;
}

function InputEvent({ id, isConnectable, data }: ClickEventProps) {
  const { setXPath, setDescription } = useStore(selector(id), shallow);

  const [stashXpath, setStashXpath] = useState(data.XPath);
  const [stashDescription, setStashDescription] = useState(data.description);

  const xpathChange = (e:inputEvent) => {
    setStashXpath(e.target.value);
  };

  const descriptionChange = (e:inputEvent) => {
    setStashDescription(e.target.value);
  };

  return (
    <ContextMenu id={id} color={'text-customPink-400'}>
      <div
        className={`overflow-hidde h-[174px] w-[228px] overflow-hidden rounded-nodebase border border-customPink-400 bg-white ${
          data.disable ? 'toggleOpacity' : ''
        } `}
      >
        <Handle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          className=' react-flow__handle-target after:border after:border-customPink-400'
          style={{ left: '-8px', top: '81px' }}
        />
        <div className=' flex h-[33%] items-center justify-center border border-b-customPink-400 bg-customPink-50'>
          <div className=' flex items-center gap-2'>
            <span className=' text-customPink-400'>
              <IoMdCheckboxOutline size='24px' />
            </span>
            <div className=' text-2xl font-medium text-customPink-400'>{data.label}</div>
          </div>
        </div>
        {/* <div className=' text-xs'>{id}</div> */}
        <div className=' flex flex-col pl-5 pr-5'>
          <input
            id='clickDescription'
            name='clickDescription'
            onChange={descriptionChange}
            value={stashDescription}
            onBlur={setDescription}
            maxLength={21}
            placeholder='checkbox for.....'
            className='nodrag mt-3 rounded-sm text-center text-gray-400 outline-none focus:italic focus:underline '
          />
          <label htmlFor='text' className=' mb-1 text-customPink-500'>
            XPath：
          </label>
          <input
            id='text'
            name='text'
            value={stashXpath}
            onChange={xpathChange}
            onBlur={setXPath}
            className='nodrag rounded-md border border-customPink-500 p-1 outline-none'
            placeholder='xpath.....'
          />
        </div>
        <Handle
          type='source'
          position={Position.Right}
          id='click'
          isConnectable={isConnectable}
          className=' react-flow__handle-source after:border after:border-customPink-400'
          style={{ right: '-8px', top: '140px' }}
        />
      </div>
    </ContextMenu>
  );
}

export default InputEvent;
