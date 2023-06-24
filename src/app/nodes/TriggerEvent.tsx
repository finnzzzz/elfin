import { Handle, Position } from 'reactflow';

type TriggerEventProps = {
  isConnectable: boolean;
};

const TriggerEvent = ({ isConnectable }: TriggerEventProps) => {
  return (
    <div className='h-[80px] rounded-md border border-blue-600 bg-white p-2'>
      <Handle
        type='source'
        id='trigger'
        position={Position.Right}
        isConnectable={isConnectable}
      />

      <div>TriggerEvent</div>
    </div>
  );
};

export default TriggerEvent;
