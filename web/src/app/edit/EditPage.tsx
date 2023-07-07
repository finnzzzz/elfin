'use client';
// ---------------------------------------React
import { useState, useRef, useCallback } from 'react';
// ---------------------------------------React-Flow
import ReactFlow, {
  Background,
  ReactFlowProvider,
  // Controls,
  Panel,
  ReactFlowInstance,
  MiniMap,
  // getOutgoers,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
// ---------------------------------------Zustand
import useStore from '../store';
import user_useStore from '../user_store';
// import { shallow } from 'zustand/shallow';
// ---------------------------------------Components
import Toolbox from './Toolbox';
// ---------------------------------------NodesInterface
import ClickEvent from '../nodes/ClickEvent';
import DelayEvent from '../nodes/DelayEvent';
import TriggerEvent from '../nodes/TriggerEvent';
import InputEvent from '../nodes/InputEvent';
import NewTabEvent from '../nodes/NewTabEvent';
import GetContentEvent from '../nodes/GetContentEvent';

// ---------------------------------------FirebaseFunction
import asyncUpdateWorkflow from '../api/workflowData/asyncUpdateWorkflow';

// ----------------------------------------------------------

const nodeTypes = {
  trigger: TriggerEvent,
  click: ClickEvent,
  delay: DelayEvent,
  inputCustom: InputEvent,
  newTab: NewTabEvent,
  getContent: GetContentEvent,
};

const flowKey = 'demo-flow';

type a = ReactFlowInstance;

interface EditPageProps {
  id: string;
}

const EditPage = ({ id }: EditPageProps) => {
  const setEdges = useStore((state) => state.setEdges);
  const createNode = useStore((state) => state.createNode);
  const edges = useStore((state) => state.edges);
  const nodes = useStore((state) => state.nodes);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onConnect = useStore((state) => state.onConnect);
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

      createNode(type, position);
    },
    [reactFlowInstance]
  );

  const onUpdate = useCallback(
    async (uid: string, id: string) => {
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

  const onEdgeUpdate = (oldEdge, newConnection) => {
    console.log('oldEdge', oldEdge);
    console.log('newConnection', newConnection);
    const newConnectionWithStyle = {
      ...newConnection,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 18,
        height: 18,
        color: '#307dfa',
      },
      style: {
        strokeWidth: 2,
        stroke: '#307dfa',
      },
    };
    console.log('newConnectionWithStyle', newConnectionWithStyle);

    const allEdges = addEdge(newConnectionWithStyle, edges);
    console.log('allEdges', allEdges);
    const newEdges = allEdges.filter((item) => item.id !== oldEdge.id);
    console.log('newEdges', newEdges);

    setEdges(newEdges);
  };

  const doubleClick = (_, edge) => {
    const newEdges = edges.filter((e) => e.id !== edge.id);
    console.log('newEdges', newEdges);
    setEdges(newEdges);
  };

  // const onEdgeUpdate = useCallback(
  //   (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
  //   []
  // );

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
  // };

  // const onNodeContextMenu = () => {
  //   setIsOpen(true);
  // };

  // const onNodeMouseLeave = () => {
  //   setIsOpen(false);
  // };
  return (
    <div className='flex h-full w-full flex-grow flex-row bg-slate-100 '>
      <ReactFlowProvider>
        <Toolbox nodes={nodes} edges={edges} />
        <div className=' h-full flex-grow' ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onEdgeDoubleClick={doubleClick}
            onEdgeUpdate={onEdgeUpdate}
            // onNodeMouseEnter={onNodeContextMenu}
            // onNodeMouseLeave={onNodeMouseLeave}
            minZoom={0.5}
            maxZoom={1.5}
            // fitView
            // fitViewOptions={{ padding: 0.5 }}
            // onNodeClick={nodeClick}
          >
            {/* <Controls /> */}
            <Panel position='top-right'>
              <button
                className=' late-50 mr-2 rounded-md border border-blue-500 bg-white p-1'
                onClick={() => {
                  onUpdate(userInfo.userUid, id);
                }}
              >
                save
              </button>
              {/* <button
                className='p1 border border-blue-500'
                onClick={() => {
                  console.log('123');
                }}
              >
                test
              </button> */}
            </Panel>

            {/* <ContentMenu isOpen={isOpen} position={position} /> */}

            <MiniMap zoomable pannable />
            <Background size={1} offset={2} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default EditPage;
