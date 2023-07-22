import { useState, ChangeEvent } from 'react';
import { Handle, Position } from 'reactflow';
import CustomHandle from './utils/customHandle';

import { LuSend } from 'react-icons/lu';

import useStore from '../store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

type inputEvent = ChangeEvent<HTMLInputElement>;
type textareaEvent = ChangeEvent<HTMLTextAreaElement>;

const selector = (id: string) => (store: any) => ({
  setXPath: (e: inputEvent) => store.updateNode(id, { XPath: e.target.value }),
  setDescription: (e: inputEvent) => store.updateNode(id, { description: e.target.value }),
  setValue: (e: textareaEvent) => store.updateNode(id, { value: e.target.value }),
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

function EnterSubmitEvent({ id, data }: ClickEventProps) {
  const { setXPath, setDescription } = useStore(selector(id), shallow);
  const { isConnectable, maxConnections } = data;
  const [stashXpath, setStashXpath] = useState(data.XPath);
  const [stashDescription, setStashDescription] = useState(data.description);

  const xpathChange = (e: inputEvent) => {
    setStashXpath(e.target.value);
  };

  const descriptionChange = (e: inputEvent) => {
    setStashDescription(e.target.value);
  };

  return (
    <ContextMenu id={id} color={'text-customDarkBlue-400'}>
      <div
        className={` w-[228px] overflow-hidden rounded-nodebase border border-customDarkBlue-400 bg-white ${
          data.disable ? 'toggleOpacity' : ''
        }`}
      >
        <CustomHandle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          maxConnections={maxConnections}
          className=' react-flow__handle-target after:border after:border-customDarkBlue-400'
          style={{ left: '-8px', top: '81px' }}
        />
        <div className=' flex h-[56px] items-center justify-center border border-b-customDarkBlue-400 bg-customDarkBlue-50'>
          <div className=' flex items-center gap-2'>
            <span className=' text-customDarkBlue-400'>
              <LuSend size='22px' />
            </span>
            <div className=' text-2xl font-medium text-customDarkBlue-400'>{data.label}</div>
          </div>
        </div>
        <div className=' flex flex-col pb-5 pl-5 pr-5'>
          <input
            id='textDescription'
            name='textDescription'
            onChange={descriptionChange}
            value={stashDescription}
            onBlur={setDescription}
            maxLength={21}
            placeholder='submit for.....'
            className='nodrag mt-3 rounded-sm text-center text-gray-400 outline-none focus:underline'
          />
          <label htmlFor='text' className=' mb-1 text-customDarkBlue-500'>
            XPath：
          </label>
          <input
            id='text'
            name='text'
            value={stashXpath}
            onChange={xpathChange}
            onBlur={setXPath}
            className='nodrag rounded-md border border-customDarkBlue-500 p-1 outline-none'
            placeholder='xpath.....'
          />
        </div>
        <Handle
          type='source'
          position={Position.Right}
          id='click'
          isConnectable={isConnectable}
          className=' react-flow__handle-source after:border after:border-customDarkBlue-400'
          style={{ right: '-8px', top: '140px' }}
        />
      </div>
    </ContextMenu>
  );
}

export default EnterSubmitEvent;
