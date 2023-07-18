import { useState, ChangeEvent } from 'react';
import { Handle, Position } from 'reactflow';

import { LuTextCursorInput } from 'react-icons/lu';

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

function InputTextEvent({ id, isConnectable, data }: ClickEventProps) {
  const { setXPath, setDescription, setValue } = useStore(selector(id), shallow);

  const [stashXpath, setStashXpath] = useState(data.XPath);
  const [stashDescription, setStashDescription] = useState(data.description);
  const [stashContent, setStashContent] = useState(data.value);
  const [textEnterType, setTextEnterType] = useState('content');

  const xpathChange = (e: inputEvent) => {
    setStashXpath(e.target.value);
  };

  const descriptionChange = (e: inputEvent) => {
    setStashDescription(e.target.value);
  };

  const contentChange = (e: textareaEvent) => {
    setStashContent(e.target.value);
  };

  const handleTextEnterType = (e) => {
    console.log(e.target.value);
    setTextEnterType(e.target.value);
    if (e.target.value === 'extensionVariable') {
      setValue(e);
    }
  };

  return (
    <ContextMenu id={id} color={'text-customPurple-400'}>
      <div
        className={` w-[228px] h-[270px] overflow-hidden rounded-nodebase border border-customPurple-400 bg-white ${
          data.disable ? 'toggleOpacity' : ''
        }`}
      >
        <Handle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          className=' react-flow__handle-target after:border after:border-customPurple-400'
          style={{ left: '-8px', top: '81px' }}
        />
        <div className=' flex h-[56px] items-center justify-center border border-b-customPurple-400 bg-customPurple-50'>
          <div className=' flex items-center gap-2'>
            <span className=' text-customPurple-400'>
              <LuTextCursorInput size='24px' />
            </span>
            <div className=' text-2xl font-medium text-customPurple-400'>{data.label}</div>
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
            placeholder='text for.....'
            className='nodrag mt-3 rounded-sm text-center text-gray-400 outline-none focus:underline'
          />
          <label htmlFor='text' className=' mb-1 text-customPurple-500'>
            XPath：
          </label>
          <input
            id='text'
            name='text'
            value={stashXpath}
            onChange={xpathChange}
            onBlur={setXPath}
            className='nodrag rounded-md border border-customPurple-500 p-1 outline-none'
            placeholder='xpath.....'
          />
          <select
            name=''
            id=''
            onChange={handleTextEnterType}
            value={textEnterType}
            className=' m-[-4px] mb-1 mt-2 border-red-600 p-0  text-customPurple-500 outline-none'
          >
            <option value='content'>Content</option>
            <option value='extensionVariable'>Extension Variable</option>
          </select>
          {textEnterType === 'extensionVariable' ? (
            <div className=' text-gray-500 text-sm text-center mt-5'>Enter value in extension</div>
          ) : (
            <textarea
              id='text'
              name='text'
              cols={3}
              rows={2}
              value={stashContent}
              onChange={contentChange}
              onBlur={setValue}
              className='nodrag resize-none rounded-md border border-customPurple-500 p-1 outline-none'
              placeholder='content.....'
            />
          )}
        </div>
        <Handle
          type='source'
          position={Position.Right}
          id='click'
          isConnectable={isConnectable}
          className=' react-flow__handle-source after:border after:border-customPurple-400'
          style={{ right: '-8px', top: '220px' }}
        />
      </div>
    </ContextMenu>
  );
}

export default InputTextEvent;
