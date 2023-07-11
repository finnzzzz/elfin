import { useState } from 'react';
import { Handle, Position } from 'reactflow';

import { MdOutlineRadioButtonChecked } from 'react-icons/md';

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
  value: boolean;
  XPath: string;
  description: string;
  inputType: string;
};

interface ClickEventProps {
  id: string;
  isConnectable: boolean;
  data: inputObj;
}

function InputRadioEvent({ id, isConnectable, data }: ClickEventProps) {
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
    <ContextMenu id={id} color={'text-customDarkYellow-400'}>
      <div
        className={`overflow-hidde h-[174px] w-[228px] overflow-hidden rounded-nodebase border border-customDarkYellow-400 bg-white ${
          data.disable ? 'toggleOpacity' : ''
        } `}
      >
        <Handle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          className=' react-flow__handle-target after:border after:border-customDarkYellow-400'
          style={{ left: '-8px', top: '81px' }}
        />
        <div className=' flex h-[33%] items-center justify-center border border-b-customDarkYellow-400 bg-customDarkYellow-50'>
          <div className=' flex items-center gap-2'>
            <span className=' text-customDarkYellow-400'>
              <MdOutlineRadioButtonChecked size='24px' />
            </span>
            <div className=' text-2xl font-medium text-customDarkYellow-400'>{data.label}</div>
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
            placeholder='radio for.....'
            className='nodrag mt-3 rounded-sm text-center text-gray-400 outline-none focus:italic focus:underline '
          />
          <label htmlFor='text' className=' mb-1 text-customDarkYellow-500'>
            XPath：
          </label>
          <input
            id='text'
            name='text'
            value={stashXpath}
            onChange={xpathChange}
            onBlur={setXPath}
            className='nodrag rounded-md border border-customDarkYellow-500 p-1 outline-none'
            placeholder='xpath.....'
          />
        </div>
        <Handle
          type='source'
          position={Position.Right}
          id='click'
          isConnectable={isConnectable}
          className=' react-flow__handle-source after:border after:border-customDarkYellow-400'
          style={{ right: '-8px', top: '140px' }}
        />
      </div>
    </ContextMenu>
  );
}

export default InputRadioEvent;
