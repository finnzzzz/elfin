import { memo } from 'react';

import { Handle, Position } from 'reactflow';
import useStore from '../store';
import { shallow } from 'zustand/shallow';
import ContextMenu from './utils/ContextMenu';

type Event = React.ChangeEvent<HTMLInputElement>;

const selector = (id: string) => (store: any) => ({
  setDelayTime: (e: Event) => store.updateNode(id, { delayTime: e.target.value }),
});

type delayObj = {
  label: 'Delay';
  disable: boolean;
  delayTime: string;
};

interface DelayEventProps {
  id: string;
  isConnectable: boolean;
  data: delayObj;
}

const DelayEvent = ({ id, isConnectable, data }: DelayEventProps) => {
  const { setDelayTime } = useStore(selector(id), shallow);

  return (
    <>
      <ContextMenu id={id}>
        <div
          className={`h-[150px] w-[160px] rounded-md border border-blue-600 bg-white ${
            data.disable ? 'toggleOpacity' : ''
          } p-2`}
        >
          <Handle
            type='target'
            position={Position.Left}
            isConnectable={isConnectable}
            style={{ background: '#909cf9', width: '18px', height: '18px', left: '-24px' }}
          />
          <div className='text-2xl'>{data.label}</div>
          <div className=' mb-4 text-xs'>{id}</div>
          <div>
            <label htmlFor='text'>Time：</label>
            <input
              id='text'
              name='text'
              onChange={setDelayTime}
              value={data.delayTime}
              placeholder='2000ms'
              className='nodrag w-full rounded-sm border border-blue-300'
            />
          </div>
          <Handle
            type='source'
            position={Position.Right}
            id='delay'
            isConnectable={isConnectable}
            style={{ background: '#909cf9', width: '18px', height: '18px', right: '-24px' }}
          />
        </div>
      </ContextMenu>
    </>
  );
};

export default memo(DelayEvent);
