import { Handle, Position } from 'reactflow';

type TriggerEventProps = {
  id: string;
  isConnectable: boolean;
};

const TriggerEvent = ({ isConnectable, id }: TriggerEventProps) => {
  return (
    <div className='flex h-[80px] flex-col items-center justify-center rounded-md border border-blue-600 bg-white p-2'>
      <Handle
        type='source'
        id='trigger'
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ background: '#909cf9', width: '18px', height: '18px', right: '-24px' }}
      />
      <div>TriggerEvent</div>
      <div className=' text-xs'>{id}</div>
    </div>
  );
};

export default TriggerEvent;
