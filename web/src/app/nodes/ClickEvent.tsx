import React from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../store';
import { shallow } from 'zustand/shallow';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setCSS: (e: Event) => store.updateNode(id, { CSS: e.target.value }),
});

interface ClickEventProps {
  id: string;
  isConnectable: boolean;
}

function ClickEvent({ id, isConnectable }: ClickEventProps) {
  const { setCSS } = useStore(selector(id), shallow);

  const nodes = useStore((state) => state.nodes);
  const CSSValue = nodes?.filter((item) => item.id == id)[0].data.CSS;

  console.log(CSSValue);

  return (
    <div className='h-[100px] rounded-md border border-blue-600 bg-white p-2'>
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <div>Click</div>
      <div>{id}</div>
      <div>
        <label htmlFor='text'>CSS：</label>
        <input
          id='text'
          name='text'
          onChange={setCSS}
          value={CSSValue}
          className='nodrag rounded-sm border border-blue-300'
        />
      </div>
      <Handle
        type='source'
        position={Position.Right}
        id='click'
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default ClickEvent;
