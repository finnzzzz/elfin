import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { create } from 'zustand';

import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Connection,
  XYPosition,
  addEdge,
  MarkerType,
} from 'reactflow';

interface Store {
  nodes: Node[];
  edges: any[];
  viewport: object;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  setViewport: (viewport: object) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNode: (nodeId: string, data: object) => void;
  createNode: (type: string, position: XYPosition) => void;
}

const useStore = create<Store>((set, get) => ({
  nodes: [],
  edges: [],
  viewport: {},

  setNodes: (nodes) => {
    set({ nodes });
  },

  setEdges: (newEdges) => {
    if (Array.isArray(newEdges)) {
      set({ edges: newEdges });
    } else {
      console.log(newEdges);
      console.error('Invalid edges data type. Expected an array.');
    }
  },

  setViewport: (viewport) => {
    set({ viewport });
  },

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    const newCon = {
      ...connection,
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
    set({
      edges: addEdge(newCon, get().edges),
    });
  },

  updateNode: (nodeId, data) => {
    console.log(nodeId, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  createNode: (type, position) => {
    const id = crypto.randomUUID();
    switch (type) {
      case 'click': {
        const data = {};

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'trigger': {
        const data = {};

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'delay': {
        const data = {};

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'inputCustom': {
        const data = {};

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'newTab': {
        const data = {};

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'getContent': {
        const data = {};

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      default:
        break;
    }
  },
}));

export default useStore;
