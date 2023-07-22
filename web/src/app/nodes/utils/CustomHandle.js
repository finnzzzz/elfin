import React, { useCallback } from 'react';
import { getConnectedEdges, Handle, useNodeId, useStore } from 'reactflow';

const selector =
  (nodeId, isConnectable = true, maxConnections = Infinity) =>
  (s) => {
    if (!isConnectable) return false;

    const node = s.nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], s.edges);

    return connectedEdges.length < maxConnections;
  };

const CustomHandle = (props) => {
  const nodeId = useNodeId();
  const isConnectable = useStore(
    useCallback(selector(nodeId, props.isConnectable, props.maxConnections), [
      nodeId,
      props.isConnectable,
      props.maxConnections,
    ])
  );

  return <Handle {...props} type='target' isConnectable={isConnectable} />;
};

export default CustomHandle;
