import React from 'react';
import { Handle, Position } from 'reactflow';

import useStore from '../store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setXPath: (e: Event) => store.updateNode(id, { XPath: e.target.value }),
  setDescription: (e: Event) => store.updateNode(id, { description: e.target.value }),
});

type clickObj = {
  label: 'Click';
  disable: boolean;
  XPath: string;
  description: string;
};

interface ClickEventProps {
  id: string;
  isConnectable: boolean;
  data: clickObj;
}

function ClickEvent({ id, isConnectable, data }: ClickEventProps) {
  const { setXPath, setDescription } = useStore(selector(id), shallow);

  return (
    <ContextMenu id={id}>
      <div
        className={`h-[170px] rounded-md border border-blue-600 bg-white p-2 ${
          data.disable ? 'toggleOpacity' : ''
        } `}
      >
        <Handle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          style={{ background: '#909cf9', width: '18px', height: '18px', left: '-24px' }}
        />
        <div className=' text-2xl'>{data.label}</div>
        <div className=' text-xs'>{id}</div>
        <div className=' flex flex-col'>
          <label htmlFor='text'>XPath：</label>
          <input
            id='text'
            name='text'
            onChange={setXPath}
            value={data.XPath}
            className='nodrag rounded-sm border border-blue-300'
          />
          <label htmlFor='text'>Description：</label>
          <input
            id='text'
            name='text'
            onChange={setDescription}
            value={data.description}
            className='nodrag rounded-sm border border-blue-300'
          />
        </div>
        <Handle
          type='source'
          position={Position.Right}
          id='click'
          isConnectable={isConnectable}
          style={{ background: '#909cf9', width: '18px', height: '18px', right: '-24px' }}
        />
      </div>
    </ContextMenu>
  );
}

export default ClickEvent;
