"use client";

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  NodeChange,
  EdgeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  ReactFlowProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CanvasProps, FlowNode, FlowEdge } from "@/types";

interface FlowCanvasComponentProps extends CanvasProps {
  className?: string;
  fitView?: boolean;
}

interface FlowStyles {
  background: string;
  controlsClass: string;
  minimapClass: string;
  minimapMaskColor: string;
  minimapNodeColor: string;
}

interface BackgroundConfig {
  variant: BackgroundVariant;
  gap: number;
  size: number;
  color: string;
}

// Initial empty state with proper typing
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export function FlowCanvas({ 
  nodes: propNodes, 
  edges: propEdges,
  onNodesChange: propOnNodesChange,
  onEdgesChange: propOnEdgesChange,
  onConnect: propOnConnect,
  className = "",
  fitView = true
}: FlowCanvasComponentProps): React.JSX.Element {
  
  // Use prop values if provided, otherwise use internal state
  const [internalNodes, setInternalNodes, internalOnNodesChange] = useNodesState(initialNodes);
  const [internalEdges, setInternalEdges, internalOnEdgesChange] = useEdgesState(initialEdges);

  // Determine which nodes/edges to use
  const nodes: Node[] = propNodes || internalNodes;
  const edges: Edge[] = propEdges || internalEdges;

  // Event handlers with proper typing
  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]): void => {
      if (propOnNodesChange) {
        propOnNodesChange(changes);
      } else {
        internalOnNodesChange(changes);
      }
    },
    [propOnNodesChange, internalOnNodesChange]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]): void => {
      if (propOnEdgesChange) {
        propOnEdgesChange(changes);
      } else {
        internalOnEdgesChange(changes);
      }
    },
    [propOnEdgesChange, internalOnEdgesChange]
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection): void => {
      if (propOnConnect) {
        propOnConnect(connection);
      } else {
        setInternalEdges((eds: Edge[]) => addEdge(connection, eds));
      }
    },
    [propOnConnect, setInternalEdges]
  );

  // Memoized style configurations
  const flowStyles: FlowStyles = useMemo(() => ({
    background: "bg-gray-50",
    controlsClass: "bg-white border border-gray-200 shadow-sm",
    minimapClass: "bg-white border border-gray-200 shadow-sm",
    minimapMaskColor: "rgba(0, 0, 0, 0.1)",
    minimapNodeColor: "#22c55e"
  }), []);

  const backgroundConfig: BackgroundConfig = useMemo(() => ({
    variant: BackgroundVariant.Dots,
    gap: 20,
    size: 1,
    color: "#e5e7eb"
  }), []);

  // ReactFlow props with proper typing
  const reactFlowProps: Partial<ReactFlowProps> = useMemo(() => ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    fitView,
    className: flowStyles.background
  }), [nodes, edges, onNodesChange, onEdgesChange, onConnect, fitView, flowStyles.background]);

  return (
    <div className={`w-full h-full ${flowStyles.background} ${className}`}>
      <ReactFlow {...reactFlowProps}>
        <Controls className={flowStyles.controlsClass} />
        <MiniMap 
          className={flowStyles.minimapClass}
          maskColor={flowStyles.minimapMaskColor}
          nodeColor={flowStyles.minimapNodeColor}
        />
        <Background 
          variant={backgroundConfig.variant}
          gap={backgroundConfig.gap}
          size={backgroundConfig.size}
          color={backgroundConfig.color}
        />
      </ReactFlow>
    </div>
  );
}
