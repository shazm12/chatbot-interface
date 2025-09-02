"use client";

import React, { useCallback, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  BackgroundVariant,
  OnConnect,
  ReactFlowProps,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NodeType } from "@/types";
import { createNode } from "@/helpers/node/createNode";
import { GenericNode } from "@/components/nodes/generic-node";
import { useFlowContext } from "@/contexts/FlowContext";

interface FlowCanvasComponentProps {
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


export function FlowCanvas({ 
  className = "",
  fitView = true
}: FlowCanvasComponentProps): React.JSX.Element {
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  
  const { 
    nodes, 
    edges, 
    setNodes, 
    setEdges, 
    onNodesChange, 
    onEdgesChange,
    validateConnection
  } = useFlowContext();

  // Prevents invalid connections including cycles in chatbot flow
  const onConnect: OnConnect = useCallback(
    (connection: Connection): void => {
      if (!validateConnection(connection)) {
        return;
      }
      
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges, validateConnection]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Creates new nodes when dragging from side panel
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');

      if (typeof nodeType === 'undefined' || !nodeType) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createNode(nodeType as NodeType, position);

      setNodes((nds) => {
        return [...nds, newNode];
      });
    },
    [screenToFlowPosition, nodes, setNodes]
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
    gap: 16,
    size: 2,
    color: "#d1d5db"
  }), []);

  // All node types use the same generic component
  const nodeTypes = {
    [NodeType.MESSAGE]: GenericNode,
    [NodeType.USER]: GenericNode,
  };

  const reactFlowProps: Partial<ReactFlowProps> = useMemo(() => ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    fitView,
    className: flowStyles.background,
    defaultEdgeOptions: {
      style: { stroke: '#b1b1b7', strokeWidth: 2 },
      markerEnd: { type: 'arrow', color: '#b1b1b7' },
    },
  }), [nodes, edges, onNodesChange, onEdgesChange, onConnect, fitView, flowStyles.background]);

  return (
    <div 
      ref={reactFlowWrapper}
      className={`w-full h-full ${flowStyles.background} ${className}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow {...reactFlowProps} nodeTypes={nodeTypes}>
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
        
        {/* SVG definitions for edge arrows */}
        <svg width="0" height="0">
          <defs>
            <marker
              id="edge-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path 
                d="M0,0 L0,6 L9,3 z" 
                fill="#b1b1b7" 
                stroke="#b1b1b7"
              />
            </marker>
            <marker
              id="edge-arrow-selected"
              markerWidth="12"
              markerHeight="12"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path 
                d="M0,0 L0,6 L9,3 z" 
                fill="#22c55e" 
                stroke="#22c55e"
              />
            </marker>
          </defs>
        </svg>
      </ReactFlow>
    </div>
  );
}
