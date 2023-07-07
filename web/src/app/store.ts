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
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  setViewport: (viewport: object) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNode: (nodeId: string, data: object) => void;
  createNode: (type: string, position: XYPosition) => void;
  deleteNodeById: (id: string) => void;
  deleteEdgeById: (id: string) => void;
  handleToggle: (id: string) => void;
}

const useStore = create<Store>((set, get) => ({
  nodes: [],
  edges: [],
  viewport: {},
  isOpen: false,

  setIsOpen: (isOpen) => {
    set({ isOpen });
  },

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
        const data = {
          label: 'Click',
          disable: false,
          XPath: '',
          description: '',
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'trigger': {
        const data = {
          label: 'Trigger',
          disable: false,
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'delay': {
        const data = {
          label: 'Delay',
          disable: false,
          delayTime: '',
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'inputCustom': {
        const data = {
          label: 'Input',
          disable: false,
          value: '',
          XPath: '',
          description: '',
          inputType: '',
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'newTab': {
        const data = {
          label: 'NewTab',
          disable: false,
          url: '',
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'getContent': {
        const data = {
          label: 'GetContent',
          disable: false,
          XPath: '',
          description: '',
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      default:
        break;
    }
  },

  handleToggle: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, disable: !node.data.disable } } : node
      ),
    }));
  },

  deleteNodeById: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((item) => item.id !== id),
    }));
  },

  deleteEdgeById: (id) => {
    set((state) => ({
      edges: state.edges.filter((item) => item.source !== id && item.target !== id),
    }));
  },
}));

export default useStore;
