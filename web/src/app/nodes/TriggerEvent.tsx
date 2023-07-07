import { Handle, Position } from 'reactflow';

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
    <div className='flex h-[80px] w-[150px] flex-col items-center justify-center rounded-md border border-blue-600 bg-white p-2'>
      <Handle
        type='source'
        id='trigger'
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ background: '#909cf9', width: '18px', height: '18px', right: '-24px' }}
      />
      <div className=' text-2xl font-medium'>{data.label}</div>
      <div className=' text-xs'>{id}</div>
    </div>
    // </ContextMenu>
  );
};

export default TriggerEvent;
