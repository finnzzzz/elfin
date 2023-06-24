import React from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../store';
import { shallow } from 'zustand/shallow';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setDelayTime: (e: Event) => store.updateNode(id, { DelayTime: e.target.value }),
});

interface DelayEventProps {
  id: string;
  isConnectable: boolean;
}

const DelayEvent = ({ id, isConnectable }: DelayEventProps) => {
  const { setDelayTime } = useStore(selector(id), shallow);

  return (
    <div className='h-[80px] rounded-md border border-blue-600 bg-white p-2'>
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <div>Delay</div>
      <div>
        <label htmlFor='text'>Time：</label>
        <input
          id='text'
          name='text'
          onChange={setDelayTime}
          className='nodrag rounded-sm border border-blue-300'
        />
      </div>
      <Handle
        type='source'
        position={Position.Right}
        id='delay'
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default DelayEvent;
