import { useState } from 'react';
import { Handle, Position } from 'reactflow';

import { IoList } from 'react-icons/io5';

import useStore from '@/store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: Store) => ({
  setXPath: (e: inputEvent) => store.updateNode(id, { XPath: e.target.value }),
  setDescription: (e: inputEvent) => store.updateNode(id, { description: e.target.value }),
  setValue: (e: inputEvent) => store.updateNode(id, { value: e.target.value }),
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

function InputSelectEvent({ id, isConnectable, data }: ClickEventProps) {
  const { setXPath, setDescription, setValue } = useStore(selector(id), shallow);

  const [stashXpath, setStashXpath] = useState(data.XPath);
  const [stashDescription, setStashDescription] = useState(data.description);
  const [stashOption, setStashOption] = useState(data.value);

  const xpathChange = (e: inputEvent) => {
    setStashXpath(e.target.value);
  };

  const descriptionChange = (e: inputEvent) => {
    setStashDescription(e.target.value);
  };

  const optionChange = (e: inputEvent) => {
    setStashOption(e.target.value);
  };

  return (
    <ContextMenu id={id} color={'text-customRed-400'}>
      <div
        className={` overflow-hidden rounded-nodebase border border-customRed-400 bg-white ${
          data.disable ? 'toggleOpacity' : ''
        }`}
      >
        <Handle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          className=' react-flow__handle-target after:border after:border-customRed-400'
          style={{ left: '-8px', top: '81px' }}
        />
        <div className=' flex h-[56px] items-center justify-center border border-b-customRed-400 bg-customRed-50'>
          <div className=' flex items-center gap-2'>
            <span className=' text-customRed-400'>
              <IoList size='24px' />
            </span>
            <div className=' text-2xl font-medium text-customRed-400'>{data.label}</div>
          </div>
        </div>
        <div className=' flex flex-col pb-5 pl-5 pr-5'>
          <input
            id='textDescription'
            name='textDescription'
            onChange={descriptionChange}
            value={stashDescription}
            onBlur={setDescription}
            maxLength={30}
            placeholder='select for.....'
            className='nodrag mt-3 rounded-sm text-center text-gray-400 outline-none focus:underline'
          />
          <div className=' mt-3 flex items-center gap-2'>
            <div>
              <label htmlFor='text' className=' mb-1 text-customRed-500'>
                XPath：
              </label>
              <input
                id='text'
                name='text'
                value={stashXpath}
                onChange={xpathChange}
                onBlur={setXPath}
                className='nodrag w-[130px] rounded-md border border-customRed-500 p-1 outline-none'
                placeholder='xpath.....'
              />
            </div>
            <div>
              <label htmlFor='text' className=' mb-1 mt-2 text-customRed-500'>
                Option：
              </label>
              <input
                id='text'
                name='text'
                onChange={optionChange}
                value={stashOption}
                onBlur={setValue}
                className='nodrag w-[130px] resize-none rounded-md border border-customRed-500 p-1 outline-none'
                placeholder='coffee or tea...'
              />
            </div>
          </div>
        </div>
        <Handle
          type='source'
          position={Position.Right}
          id='click'
          isConnectable={isConnectable}
          className=' react-flow__handle-source after:border after:border-customRed-400'
          style={{ right: '-8px', top: '122px' }}
        />
      </div>
    </ContextMenu>
  );
}

export default InputSelectEvent;
