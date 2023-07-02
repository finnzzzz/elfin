import React from 'react';
import { Handle, Position } from 'reactflow';

import useStore from '../store';
import { shallow } from 'zustand/shallow';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setCSS: (e: Event) => store.updateNode(id, { CSS: e.target.value }),
  setDescription: (e: Event) => store.updateNode(id, { Description: e.target.value }),
  setType: (e: Event) => store.updateNode(id, { Type: e.target.value }),
  setValue: (e: Event) => store.updateNode(id, { Value: e.target.value }),
});

interface ClickEventProps {
  id: string;
  isConnectable: boolean;
}

function InputEvent({ id, isConnectable }: ClickEventProps) {
  const { setCSS, setDescription, setType, setValue } = useStore(selector(id), shallow);

  const nodes = useStore((state) => state.nodes);
  const CSSValue = nodes?.filter((item) => item.id == id)[0]?.data?.CSS;
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
        // className='w-6s bg-slate-400'
      />
      <div className=' text-2xl'>Input</div>
      <div>{id}</div>
      <div className=' flex flex-col'>
        <label htmlFor='text'>CSS：</label>
        <input
          id='css'
          name='css'
          onChange={setCSS}
          value={CSSValue}
          className='nodrag rounded-sm border border-blue-300'
        />

        <label htmlFor='text'>Type：</label>
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

        <label htmlFor='text'>Value：</label>
        <input
          id='value'
          name='value'
          onChange={setValue}
          value={Value}
          className='nodrag rounded-sm border border-blue-300'
        />

        <label htmlFor='text'>Description：</label>
        <input
          id='description'
          name='description'
          onChange={setDescription}
          value={Description}
          className='nodrag rounded-sm border border-blue-300'
        />
      </div>
      <Handle
        className='bg-slate-400'
        type='source'
        position={Position.Right}
        id='input'
        isConnectable={isConnectable}
        style={{ background: '#ff3c3c', width: '15px', height: '15px', right: '-20px' }}
      />
    </div>
  );
}

export default InputEvent;
