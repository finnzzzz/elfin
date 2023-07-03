import React from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../store';
import { shallow } from 'zustand/shallow';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setXPath: (e: Event) => store.updateNode(id, { XPath: e.target.value }),
});

interface DelayEventProps {
  id: string;
  isConnectable: boolean;
}

const GetContentEvent = ({ id, isConnectable }: DelayEventProps) => {
  const nodes = useStore((state) => state.nodes);

  const { setXPath } = useStore(selector(id), shallow);
  const XPath = nodes?.filter((item) => item.id == id)[0]?.data?.XPath;

  return (
    <div className='h-[80px] rounded-md border border-blue-600 bg-white p-2'>
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <div className='text-2xl'>GetContent</div>
      <div>
        <label htmlFor='text'>XPath：</label>
        <input
          id='text'
          name='text'
          onChange={setXPath}
          value={XPath}
          className='nodrag rounded-sm border border-blue-300'
        />
      </div>
      <Handle type='source' position={Position.Right} id='delay' isConnectable={isConnectable} />
    </div>
  );
};

export default GetContentEvent;