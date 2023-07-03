import React from 'react';
import { Node } from 'reactflow';

interface ToolBoxProps {
  nodes: Node[];
}

const Toolbox = ({ nodes }: ToolBoxProps) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className=' flex w-[250px] flex-col items-center bg-zinc-200'>
      <div className=' mb-2'>ToolBox</div>
      <div
        className='node border-green-500'
        onDragStart={(event) => onDragStart(event, 'trigger')}
        draggable
      >
        trigger
      </div>
      <div
        className='node border-orange-400'
        onDragStart={(event) => onDragStart(event, 'click')}
        draggable
      >
        click
      </div>
      <div
        className='node border-slate-400'
        onDragStart={(event) => onDragStart(event, 'delay')}
        draggable
      >
        delay
      </div>
      <div
        className='node border-violet-500'
        onDragStart={(event) => onDragStart(event, 'inputCustom')}
        draggable
      >
        Input
      </div>
      <div
        className='node border-rose-500'
        onDragStart={(event) => onDragStart(event, 'newTab')}
        draggable
      >
        NewTab
      </div>
      <div
        className='node border-yellow-500'
        onDragStart={(event) => onDragStart(event, 'getContent')}
        draggable
      >
        GetContent
      </div>
      {nodes?.map((node) => (
        <div key={node.id}>
          Node {node.id} <br /> x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)}
          <br />
          type:{node.type}, data_CSS:{node.data?.CSS}
        </div>
      ))}
    </aside>
  );
};

export default Toolbox;
