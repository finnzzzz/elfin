import { useState, memo } from 'react';

import { IoTrashBinOutline } from 'react-icons/io5';
import { LiaToggleOffSolid } from 'react-icons/lia';
import { LiaToggleOnSolid } from 'react-icons/lia';

import { Position, NodeToolbar } from 'reactflow';
import useStore from '../../store';

interface ContextMenuProps {
  id: string;
  children: any;
  color: string;
}

const ContextMenu = ({ id, children, color }: ContextMenuProps) => {
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

  const hover = `hover:${color}`;

  return (
    <>
      <div onMouseEnter={() => setVisiblee(true)} onMouseLeave={() => setVisiblee(false)}>
        <NodeToolbar
          isVisible={isVisiblee}
          position={Position.Top}
          align='end'
          offset={0}
          className=' flex gap-3 rounded-md p-2 pl-[100px]'
        >
          <button onClick={toggle}>
            {disable ? (
              <LiaToggleOffSolid size='22px' color='#9DA3AE' />
            ) : (
              <span className={`${color}`}>
                <LiaToggleOnSolid size='22px' />
              </span>
            )}
          </button>
          <button onClick={handleDelete} className={` text-gray-300 hover:text-gray-500`}>
            <IoTrashBinOutline size='22px' />
          </button>
        </NodeToolbar>
        {children}
      </div>
    </>
  );
};

export default memo(ContextMenu);
