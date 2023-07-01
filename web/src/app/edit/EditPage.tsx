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
  getOutgoers,
} from 'reactflow';
import 'reactflow/dist/style.css';
// ---------------------------------------Zustand
import useStore from '../store';
import user_useStore from '../user_store';
import { shallow } from 'zustand/shallow';
// ---------------------------------------Components
import Toolbox from './Toolbox';
// ---------------------------------------NodesInterface
import ClickEvent from '../nodes/ClickEvent';
import DelayEvent from '../nodes/DelayEvent';
import TriggerEvent from '../nodes/TriggerEvent';
// ---------------------------------------FirebaseFunction
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
  const userInfo = user_useStore((state) => state.userInfo);

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

  const onUpdate = useCallback(
    async (uid, id) => {
      if (reactFlowInstance) {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));

        //儲存到firestore
        const addedRes = await asyncUpdateWorkflow(uid, id, { flow });

        console.log('addedRes', addedRes);
        console.log(reactFlowInstance.toObject());
      }
      console.log('update');
    },
    [reactFlowInstance]
  );

  // const nodeClick = (some, node) => {
  //   console.log('node', node);
  //   let childnode = getOutgoers(node, store.nodes, store.edges);
  //   console.log('childnode', childnode);
  //   const allFlow = reactFlowInstance.toObject();
  //   const successors = [];
  //   console.log(allFlow);

  //   function traverse(node) {
  //     const nextNode = getOutgoers(node, store.nodes, store.edges);
  //     // console.log('nextNodeeeee', nextNode);
  //     if (nextNode.length > 0) {
  //       successors.push(nextNode[0]);
  //       traverse(nextNode[0]);
  //     }
  //   }

    // const trigger = allFlow.nodes.find((item) => item.type === 'trigger');
    // console.log('trigger', trigger);

    // if (trigger) {
    //   traverse(trigger);
    // }

    // console.log('successors', successors);
  };
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
            // onNodeClick={nodeClick}
          >
            <Controls />
            <Panel position='top-right'>
              <button
                className=' mr-2 border border-blue-500'
                onClick={() => {
                  onUpdate(userInfo.userUid, id);
                }}
              >
                update
              </button>
              <button
                className='border border-blue-500'
                onClick={() => {
                  console.log('123');
                }}
              >
                test
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
