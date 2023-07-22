import { Edge, Node } from 'reactflow';

declare global {
  type Flow = {
    nodes: Node[];
    edges: Edge[];
    viewport: {
      x: number;
      y: number;
      zoom: number;
    };
  };

  type Store = {
    updateNode: (id: string, obj: object) => void;
  };
}

export {};
