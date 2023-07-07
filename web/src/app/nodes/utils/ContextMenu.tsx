import { useState, memo } from 'react';

import { Position, NodeToolbar } from 'reactflow';
import useStore from '../../store';

const ContextMenu = ({ id, children }) => {
  const [isVisiblee, setVisiblee] = useState(false);

  const deleteNodeById = useStore((state) => state.deleteNodeById);
  const deleteEdgeById = useStore((state) => state.deleteEdgeById);
  const handleToggle = useStore((state) => state.handleToggle);
  const nodes = useStore((state) => state.nodes);

  const disable = nodes?.filter((item) => item.id == id)[0]?.data?.disable;

  const handleDelete = () => {
    console.log('delete');
    console.log(id);
    deleteNodeById(id);
    deleteEdgeById(id);
  };

  const toggle = () => {
    console.log('toggle');
    handleToggle(id);
  };
  console.log('cmrender');

  return (
    <>
      <div onMouseEnter={() => setVisiblee(true)} onMouseLeave={() => setVisiblee(false)}>
        <NodeToolbar
          isVisible={isVisiblee}
          position={Position.Top}
          align='end'
          offset={0}
          className=' rounded-md border border-black'
        >
          <button className='border border-black p-1' onClick={toggle}>
            {disable ? 'true' : 'false'}
          </button>
          <button className='border border-black  p-1' onClick={handleDelete}>
            delete
          </button>
        </NodeToolbar>
        {children}
      </div>
    </>
  );
};

export default memo(ContextMenu);
