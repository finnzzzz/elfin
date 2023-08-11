import { Edge, Node, XYPosition } from 'reactflow';

declare global {
  type Flow = {
    nodes: Node[];
    edges: Edge[];
    viewport: XYPosition;
  };

  type Store = {
    updateNode: (id: string, obj: object) => void;
  };
}

export {};
