import React from 'react';
import { Handle, Position } from 'reactflow';

import useStore from '../store';
import { shallow } from 'zustand/shallow';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setCSS: (e: Event) => store.updateNode(id, { CSS: e.target.value }),
  setDescription: (e: Event) => store.updateNode(id, { Description: e.target.value }),
});

interface ClickEventProps {
  id: string;
  isConnectable: boolean;
}

function ClickEvent({ id, isConnectable }: ClickEventProps) {
  const { setCSS, setDescription } = useStore(selector(id), shallow);

  const nodes = useStore((state) => state.nodes);
  const CSSValue = nodes?.filter((item) => item.id == id)[0]?.data?.CSS;
  const Description = nodes?.filter((item) => item.id == id)[0]?.data?.Description;

  // console.log('CSSvalue', CSSValue);

  return (
    <div className='h-[170px] rounded-md border border-blue-600 bg-white p-2'>
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <div className=' text-2xl'>Click</div>
      <div>{id}</div>
      <div className=' flex flex-col'>
        <label htmlFor='text'>CSS：</label>
        <input
          id='text'
          name='text'
          onChange={setCSS}
          value={CSSValue}
          className='nodrag rounded-sm border border-blue-300'
        />
        <label htmlFor='text'>Description：</label>
        <input
          id='text'
          name='text'
          onChange={setDescription}
          value={Description}
          className='nodrag rounded-sm border border-blue-300'
        />
      </div>
      <Handle type='source' position={Position.Right} id='click' isConnectable={isConnectable} />
    </div>
  );
}

export default ClickEvent;
