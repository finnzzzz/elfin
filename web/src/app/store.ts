import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { create } from 'zustand';

import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Connection,
  XYPosition,
} from 'reactflow';

interface Store {
  nodes: Node[];
  edges: Edge[];
  viewport: object;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
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
      default:
        break;
    }
  },
}));

export default useStore;
