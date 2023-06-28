import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { create } from 'zustand';

import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from 'reactflow';

interface Store {
  nodes: Node[];
  edges: Edge[];
  viewport: {};
  setNodes: (_nodes: Node[]) => void;
  setEdges: (_edges: Edge[]) => void;
  setViewport: (_viewport: {}) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNode: (_nodeId: string, _data: object) => void;
  createNode: (_type: any, _position: any) => void;
}

const useStore = create<Store>((set, get) => ({
  nodes: [],
  edges: [],
  viewport: {},



  setNodes: (nodes) => {
    set({ nodes: nodes });
  },

  setEdges: (edges) => {
    set({ edges });
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
    set({
      edges: addEdge(connection, get().edges),
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
      default:
        break;
    }
  },
}));

export default useStore;
