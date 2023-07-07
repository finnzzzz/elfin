import React from 'react';
import { Handle, Position } from 'reactflow';

import useStore from '../store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

type inputEvent = React.ChangeEvent<HTMLInputElement>;
type selectEvent = React.ChangeEvent<HTMLSelectElement>;

const selector = (id: string) => (store: any) => ({
  setXPath: (e: inputEvent) => store.updateNode(id, { XPath: e.target.value }),
  setDescription: (e: inputEvent) => store.updateNode(id, { description: e.target.value }),
  setType: (e: selectEvent) => store.updateNode(id, { type: e.target.value }),
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

function InputEvent({ id, isConnectable, data }: ClickEventProps) {
  const { setXPath, setDescription, setType, setValue } = useStore(selector(id), shallow);

  return (
    <ContextMenu id={id}>
      <div
        className={`h-[300px] rounded-md border border-blue-600 bg-white p-2 ${
          data.disable ? 'toggleOpacity' : ''
        }`}
      >
        <Handle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          style={{ background: '#90b6f9', width: '18px', height: '18px', left: '-24px' }}
        />
        <div className=' text-2xl font-medium'>{data.label}</div>
        <div className=' text-xs'>{id}</div>
        <div className=' flex flex-col'>
          <label className=' mt-2'>XPath：</label>
          <input
            id='css'
            name='css'
            onChange={setXPath}
            value={data.XPath}
            className='nodrag rounded-sm border border-blue-300'
          />

          <label className=' mt-2'>Type：</label>
          <select
            name='type'
            id='type'
            value={data.inputType}
            onChange={setType}
            className='nodrag rounded-sm border border-blue-300'
          >
            <option value='text'>Text</option>
            <option value='select'>Select</option>
            <option value='radio'>Radio</option>
            <option value='checkbox'>Checkbox</option>
          </select>

          <label className=' mt-2'>Value：</label>
          <input
            id='value'
            name='value'
            onChange={setValue}
            value={data.value}
            className='nodrag rounded-sm border border-blue-300'
          />

          <label className=' mt-2'>Description：</label>
          <input
            id='description'
            name='description'
            onChange={setDescription}
            value={data.description}
            className='nodrag rounded-sm border border-blue-300'
          />
        </div>
        <Handle
          type='source'
          position={Position.Right}
          id='input'
          isConnectable={isConnectable}
          style={{ background: '#90b6f9', width: '18px', height: '18px', right: '-24px' }}
        />
      </div>
    </ContextMenu>
  );
}

export default InputEvent;
