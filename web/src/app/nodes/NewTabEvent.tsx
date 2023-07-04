import React from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../store';
import { shallow } from 'zustand/shallow';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setURL: (e: Event) => store.updateNode(id, { URL: e.target.value }),
});

interface DelayEventProps {
  id: string;
  isConnectable: boolean;
}

const NewTabEvent = ({ id, isConnectable }: DelayEventProps) => {
  const nodes = useStore((state) => state.nodes);

  const { setURL } = useStore(selector(id), shallow);
  const URL = nodes?.filter((item) => item.id == id)[0]?.data?.URL;

  return (
    <div className='h-[80px] rounded-md border border-blue-600 bg-white p-2'>
      <Handle
        type='target'
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ background: '#909cf9', width: '18px', height: '18px', left: '-24px' }}
      />
      <div className='text-2xl'>NewTab</div>
      <div>
        <label htmlFor='text'>URL：</label>
        <input
          id='text'
          name='text'
          onChange={setURL}
          value={URL}
          className='nodrag rounded-sm border border-blue-300'
        />
      </div>
      <Handle
        type='source'
        position={Position.Right}
        id='newTab'
        isConnectable={isConnectable}
        style={{ background: '#909cf9', width: '18px', height: '18px', right: '-24px' }}
      />
    </div>
  );
};

export default NewTabEvent;
