import React from 'react';
import nodeDatas from './nodeDatas';

import { PiHandTap } from 'react-icons/pi';
import { PiHandSwipeRight } from 'react-icons/pi';

interface NodeItemData {
  icon: React.ReactNode;
  text: string;
  type: string;
  color: string;
}

interface ToolboxSectionData {
  title: string;
  items: NodeItemData[];
}

interface ToolboxContainerProps {
  nodeDatas: ToolboxSectionData[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, type: string) => void;
}

interface ToolboxSectionProps extends ToolboxSectionData {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, type: string) => void;
}

interface ToolboxItemProps extends NodeItemData {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, type: string) => void;
}

const Toolbox = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const ToolboxContainer: React.FC<ToolboxContainerProps> = ({ nodeDatas, onDragStart }) => (
    <aside className=' flex h-full w-[120px] flex-col items-center overflow-auto border-r border-b-gray-300 p-2 sm:w-[190px] md:w-[260px] md:p-5'>
      <div className='flex w-full flex-col gap-4'>
        {nodeDatas.map((nodeData) => (
          <ToolboxSection
            key={nodeData.title}
            title={nodeData.title}
            items={nodeData.items}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </aside>
  );

  const ToolboxSection: React.FC<ToolboxSectionProps> = ({ title, items, onDragStart }) => (
    <div>
      <span className=' text-base text-gray-600 sm:text-lg'>{title}</span>
      <div className='toolboxContainer'>
        {items.map((item) => (
          <ToolboxItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            onDragStart={onDragStart}
            color={item.color}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );

  const ToolboxItem: React.FC<ToolboxItemProps> = ({ icon, text, onDragStart, color, type }) => (
    <div
      className={`toolboxItem ${color}`}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className=' hidden sm:block'>{icon}</span>
      <span className=' text-sm md:text-base'>{text}</span>
    </div>
  );

  return (
    <div className=' flex flex-col  bg-white'>
      <div className='flex flex-col items-center justify-center gap-3 border-b  border-r border-b-gray-300 border-r-gray-300 p-2 text-center text-base font-bold text-blue-600 sm:flex-row md:p-5 md:text-lg '>
        <span className='hidden sm:block'>
          <PiHandTap size='22px' />
        </span>
        <span>Drag to create</span>
        <span className='hidden sm:block'>
          <PiHandSwipeRight size='22px' />
        </span>
      </div>
      <ToolboxContainer nodeDatas={nodeDatas} onDragStart={onDragStart} />
    </div>
  );
};

export default Toolbox;
