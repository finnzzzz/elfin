import React from 'react';
import { Handle, Position } from 'reactflow';

import useStore from '../store';
import { shallow } from 'zustand/shallow';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setXPath: (e: Event) => store.updateNode(id, { XPath: e.target.value }),
  setDescription: (e: Event) => store.updateNode(id, { Description: e.target.value }),
  setType: (e: Event) => store.updateNode(id, { Type: e.target.value }),
  setValue: (e: Event) => store.updateNode(id, { Value: e.target.value }),
});

interface ClickEventProps {
  id: string;
  isConnectable: boolean;
}

function InputEvent({ id, isConnectable }: ClickEventProps) {
  const { setXPath, setDescription, setType, setValue } = useStore(selector(id), shallow);

  const nodes = useStore((state) => state.nodes);
  const XPath = nodes?.filter((item) => item.id == id)[0]?.data?.XPath;
  const Description = nodes?.filter((item) => item.id == id)[0]?.data?.Description;
  const Type = nodes?.filter((item) => item.id == id)[0]?.data?.Type;
  const Value = nodes?.filter((item) => item.id == id)[0]?.data?.Value;

  // console.log('CSSvalue', CSSValue);

  return (
    <div className='h-[300px] rounded-md border border-blue-600 bg-white p-2'>
      <Handle
        type='target'
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ background: '#90b6f9', width: '18px', height: '18px', left: '-24px' }}
      />
      <div className=' text-2xl font-medium'>Input</div>
      <div className=' text-xs'>{id}</div>
      <div className=' flex flex-col'>
        <label className=' mt-2'>XPath：</label>
        <input
          id='css'
          name='css'
          onChange={setXPath}
          value={XPath}
          className='nodrag rounded-sm border border-blue-300'
        />

        <label className=' mt-2'>Type：</label>
        <select
          name='type'
          id='type'
          value={Type}
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
          value={Value}
          className='nodrag rounded-sm border border-blue-300'
        />

        <label className=' mt-2'>Description：</label>
        <input
          id='description'
          name='description'
          onChange={setDescription}
          value={Description}
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
  );
}

export default InputEvent;
