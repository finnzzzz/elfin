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
  scriptName: string;
  saveTime: string;
  setIsOpen: (isOpen: boolean) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  setViewport: (viewport: object) => void;
  setScriptName: (scriptName: string) => void;
  setSaveTime: (saveTime: string) => void;
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
  scriptName: '',
  saveTime: '',

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

  setScriptName: (scriptName) => {
    set({ scriptName });
  },

  setSaveTime: (saveTime) => {
    set({ saveTime });
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
        width: 12,
        height: 12,
        color: '#9f9f9f',
      },
      style: {
        strokeWidth: 1.8,
        stroke: '#ababab',
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
          description: '',
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
      case 'inputText': {
        const data = {
          label: 'Text',
          disable: false,
          XPath: '',
          value: '',
          description: '',
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'inputSelect': {
        const data = {
          label: 'Select',
          disable: false,
          XPath: '',
          value: '',
          description: '',
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'inputRadio': {
        const data = {
          label: 'Radio',
          disable: false,
          XPath: '',
          value: true,
          description: '',
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'inputCheckbox': {
        const data = {
          label: 'Checkbox',
          disable: false,
          XPath: '',
          value: true,
          description: '',
        };

        set({ nodes: [...get().nodes, { id, type, data, position }] });
        break;
      }
      case 'enterSubmit': {
        const data = {
          label: 'Enter Submit',
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
