import { Handle, Position } from 'reactflow';

import { TbRocket } from 'react-icons/tb';
import { TiArrowRight } from 'react-icons/ti';

type triggerObj = {
  label: 'Trigger';
  disable: boolean;
};

type TriggerEventProps = {
  id: string;
  isConnectable: boolean;
  data: triggerObj;
};

const TriggerEvent = ({ isConnectable, id, data }: TriggerEventProps) => {
  return (
    // <ContextMenu id={id}>
    <div className='flex h-[86px] w-[200px] overflow-hidden rounded-[16px] border border-mainBlue-400 bg-white'>
      <Handle
        type='source'
        id='trigger'
        position={Position.Right}
        isConnectable={isConnectable}
        className=' react-flow__handle-source after:border after:border-mainBlue-400'
        style={{ right: '-8px' }}
      />
      <div className=' flex w-[163px] flex-col items-center justify-center border border-r-mainBlue-400'>
        <div className=' mb-1 flex items-center gap-2'>
          <span className=' text-mainBlue-400'>
            <TbRocket size='26px' />
          </span>
          <div className=' text-2xl font-medium text-mainBlue-400'>{data.label}</div>
        </div>
        <div className=' flex items-center text-gray-500'>
          <div className=' text-xs'>{id}</div>
          <TiArrowRight />
        </div>
      </div>
      <div className=' w-full flex-1 border-l-mainBlue-400 bg-mainBlue-50'></div>
    </div>
    // </ContextMenu>
  );
};

export default TriggerEvent;
