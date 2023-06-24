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
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  // eslint-disable-next-line no-unused-vars
  updateNode: (id: string, data: object) => void;
  // eslint-disable-next-line no-unused-vars
  createNode: (type: any, position: any) => void;
}

const useStore = create<Store>((set, get) => ({
  nodes: [],
  edges: [],

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

  updateNode: (id, data) => {
    console.log(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  createNode: (type, position) => {
    const id = crypto.randomUUID();
    switch (type) {
      case 'click': {
        const data = {};

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        console.log('store.nodes:', get().edges);
        break;
      }
      case 'trigger': {
        const data = {};

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        console.log('store.nodes:', get().nodes);
        break;
      }
      case 'delay': {
        const data = {};

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        console.log('store.nodes:', get().nodes);
        break;
      }
      default:
        break;
    }
  },
}));

export default useStore;
