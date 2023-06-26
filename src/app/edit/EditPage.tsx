'use client';
// ---------------------------------------React
import { useState, useRef, useCallback } from 'react';
// ---------------------------------------React-Flow
import ReactFlow, {
  Background,
  ReactFlowProvider,
  Controls,
  Panel,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
// ---------------------------------------Zustand
import useStore from '../store';
import { shallow } from 'zustand/shallow';
// ---------------------------------------Components
import Toolbox from './Toolbox';
// ---------------------------------------NodesInterface
import ClickEvent from '../nodes/ClickEvent';
import DelayEvent from '../nodes/DelayEvent';
import TriggerEvent from '../nodes/TriggerEvent';
// ---------------------------------------FirebaseFunction
import asyncAddWorkflow from '../api/workflowData/asyncAddWorkflow';
import asyncSetWorkflow from '../api/workflowData/asyncSetWorkflow';
import asyncUpdateWorkflow from '../api/workflowData/asyncUpdateWorkflow';

// ----------------------------------------------------------
const selector = (store: any) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  onConnect: store.onConnect,
  createNode: store.createNode,
});

const nodeTypes = { trigger: TriggerEvent, click: ClickEvent, delay: DelayEvent };

const flowKey = 'demo-flow';

type a = ReactFlowInstance;

const EditPage = ({ id }) => {
  const store = useStore(selector, shallow);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<a | null>(null);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds!.left,
        y: event.clientY - reactFlowBounds!.top,
      });

      store.createNode(type, position);
    },
    [reactFlowInstance, store]
  );

  const onSave = useCallback(async () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));

      //儲存到firestore
      const addedRes = await asyncAddWorkflow({ flow });

      console.log('addedRes', addedRes);
      console.log('save', reactFlowInstance.toObject());
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    // const restoreFlow = async () => {
    //   const flow = JSON.parse(localStorage.getItem(flowKey));
    //   if (flow) {
    //     const { x = 0, y = 0, zoom = 1 } = flow.viewport;
    //     setNodes(flow.nodes || []);
    //     setEdges(flow.edges || []);
    //     setViewport({ x, y, zoom });
    //   }
    // };
    // restoreFlow();
    console.log('restore');
  }, []);

  const onUpdate = useCallback(
    async (id) => {
      if (reactFlowInstance) {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));

        //儲存到firestore
        const addedRes = await asyncUpdateWorkflow(id, { flow });

        console.log('addedRes', addedRes);
        console.log(reactFlowInstance.toObject());
      }
      console.log('update');
    },
    [reactFlowInstance]
  );

  return (
    <div className='flex h-full w-full flex-grow flex-row bg-slate-100 '>
      <ReactFlowProvider>
        <Toolbox nodes={store.nodes} />
        <div className=' h-full flex-grow' ref={reactFlowWrapper}>
          <ReactFlow
            nodes={store.nodes}
            edges={store.edges}
            onNodesChange={store.onNodesChange}
            onEdgesChange={store.onEdgesChange}
            onConnect={store.onConnect}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            // fitView
          >
            <Controls />
            <Panel position='top-right'>
              <button className=' mr-2 border border-blue-500' onClick={onSave}>
                save
              </button>
              <button
                className=' mr-2 border border-blue-500'
                onClick={() => {
                  onUpdate(id);
                }}
              >
                update
              </button>
              <button className='border border-blue-500' onClick={onRestore}>
                restore
              </button>
            </Panel>
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default EditPage;
