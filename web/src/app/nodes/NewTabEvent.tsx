import React from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setURL: (e: Event) => store.updateNode(id, { url: e.target.value }),
  setDescription: (e: Event) => store.updateNode(id, { description: e.target.value }),
});

type newTabObj = {
  label: 'NewTab';
  disable: boolean;
  url: string;
  description: string;
};

interface NewTabProps {
  id: string;
  isConnectable: boolean;
  data: newTabObj;
}

const NewTabEvent = ({ id, isConnectable, data }: NewTabProps) => {
  const { setURL, setDescription } = useStore(selector(id), shallow);

  return (
    <ContextMenu id={id}>
      <div
        className={`h-[200px] rounded-md border border-blue-600 bg-white p-2 ${
          data.disable ? 'toggleOpacity' : ''
        }`}
      >
        <Handle
          type='target'
          position={Position.Left}
          isConnectable={isConnectable}
          style={{ background: '#909cf9', width: '18px', height: '18px', left: '-24px' }}
        />
        <div className='text-2xl'>{data.label}</div>
        <div className=' mb-4 text-xs'>{id}</div>

        <div className=' flex flex-col'>
          <label htmlFor='text'>URL：</label>
          <input
            id='text'
            name='text'
            onChange={setURL}
            value={data.url}
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
          id='newTab'
          isConnectable={isConnectable}
          style={{ background: '#909cf9', width: '18px', height: '18px', right: '-24px' }}
        />
      </div>
    </ContextMenu>
  );
};

export default NewTabEvent;
