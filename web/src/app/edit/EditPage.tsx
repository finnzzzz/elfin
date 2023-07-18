'use client';
// ---------------------------------------React
import { useState, useRef, useCallback, useEffect } from 'react';
// ---------------------------------------React-Flow
import { IoSave } from 'react-icons/io5';
import { BiTrash } from 'react-icons/bi';
// ---------------------------------------React-Flow
import ReactFlow, {
  Background,
  ReactFlowProvider,
  Panel,
  ReactFlowInstance,
  MiniMap,
  // getOutgoers,
  addEdge,
  MarkerType,
  // OnConnectStart,
  // OnConnectEnd,
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
import NewTabEvent from '../nodes/NewTabEvent';
import GetContentEvent from '../nodes/GetContentEvent';
import InputTextEvent from '../nodes/InputTextEvent';
import InputSelectEvent from '../nodes/InputSelectEvent';
import InputRadioEvent from '../nodes/InputRadioEvent';
import InputCheckboxEvent from '../nodes/InputCheckboxEvent';
import EnterSubmitEvent from '../nodes/EnterSubmitEvent';

// ---------------------------------------FirebaseFunction
import asyncUpdateWorkflow from '../api/workflowData/asyncUpdateWorkflow';
import { db } from '@/app/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
// ----------------------------------------------------------

const nodeTypes = {
  trigger: TriggerEvent,
  click: ClickEvent,
  delay: DelayEvent,
  newTab: NewTabEvent,
  getContent: GetContentEvent,
  inputText: InputTextEvent,
  inputSelect: InputSelectEvent,
  inputRadio: InputRadioEvent,
  inputCheckbox: InputCheckboxEvent,
  enterSubmit: EnterSubmitEvent,
};

const flowKey = 'demo-flow';

type a = ReactFlowInstance;

interface EditPageProps {
  id: string;
}

const EditPage = ({ id }: EditPageProps) => {
  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const createNode = useStore((state) => state.createNode);
  const edges = useStore((state) => state.edges);
  const nodes = useStore((state) => state.nodes);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onConnect = useStore((state) => state.onConnect);
  const userInfo = user_useStore((state) => state.userInfo);
  const setSaveTime = useStore((state) => state.setSaveTime);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<a | null>(null);
  const [isDirty, setIsDirty] = useState(true);

  useEffect(() => {
    if (!isDirty) {
      setIsDirty(true);
    }
  }, [nodes]);

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
        await asyncUpdateWorkflow(uid, id, { flow });
        setIsDirty(false);
        //獲取儲存時間
        const docRef = doc(db, 'users', userInfo.userUid, 'scripts', id);
        const docSnap = await getDoc(docRef);
        setSaveTime(
          new Date(docSnap.data()?.saveTime.seconds * 1000).toLocaleString('zh-TW', {
            hour12: false,
          })
        );
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

  const clearAllNodes = () => {
    const triggerNodes = nodes.filter((item) => item.type === 'trigger');
    console.log(triggerNodes);
    setNodes(triggerNodes);
    setEdges([]);
  };

  //TEST_CODE
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

  // const [connectionInProgress, setConnectionInProgress] = useState(false);
  // const onConnectStart: OnConnectStart = useCallback(() => {
  //   setConnectionInProgress(true);
  // }, [setConnectionInProgress]);

  // const onConnectEnd: OnConnectEnd = useCallback(() => {
  //   setConnectionInProgress(false);
  // }, [setConnectionInProgress]);

  return (
    <div
      className='flex flex-grow flex-row bg-gray-100 '
      style={{
        height: `calc(100% - 50px)`,
      }}
    >
      <ReactFlowProvider>
        <Toolbox />
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
            minZoom={0.5}
            maxZoom={1.5}
            // onConnectStart={onConnectStart}
            // onConnectEnd={onConnectEnd}
            // fitView
            // fitViewOptions={{ padding: 0.5 }}
            // onNodeClick={nodeClick}
          >
            <Panel position='bottom-left'>
              <button
                className='relative flex items-center justify-center gap-2 rounded-xl border border-gray-400 bg-white p-2 pl-4 pr-4 text-sm text-gray-700 hover:shadow-sm hover:shadow-mainBlue-200'
                onClick={clearAllNodes}
              >
                <span>
                  <BiTrash size='18px' />
                </span>
                Clear all nodes
              </button>
            </Panel>
            <Panel position='top-right'>
              <button
                className='relative mr-2 flex items-center justify-center gap-2 rounded-xl bg-mainBlue-400 p-2 pl-4 pr-5 text-white hover:bg-mainBlue-500 hover:shadow-indigo-400'
                onClick={() => {
                  onUpdate(userInfo.userUid, id);
                }}
              >
                {isDirty && (
                  <div className=' absolute left-[85px] top-[6px]'>
                    <span className='relative flex h-2 w-2'>
                      <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-200 opacity-75'></span>
                      <span className='relative inline-flex h-2 w-2 rounded-full bg-teal-300'></span>
                    </span>
                  </div>
                )}
                <span>
                  <IoSave size='18px' />
                </span>
                Save
              </button>
            </Panel>
            <MiniMap zoomable pannable />
            <Background size={1} offset={2} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default EditPage;
