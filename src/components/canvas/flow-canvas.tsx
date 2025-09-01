"use client";

import React, { useCallback, useMemo, useRef } from 'react';
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
  ReactFlowInstance,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CanvasProps, FlowEdge, NodeType } from "@/types";
import { createNode } from "@/helpers/node/createNode";
import nodeTypes from "@/components/nodes/node-registry";

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
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const [internalNodes, setInternalNodes, internalOnNodesChange] = useNodesState(initialNodes);
  const [internalEdges, setInternalEdges, internalOnEdgesChange] = useEdgesState(initialEdges);


  const nodes: Node[] = propNodes || internalNodes;
  const edges: Edge[] = propEdges || internalEdges;


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


  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      console.log('Drop event triggered');

      const nodeType = event.dataTransfer.getData('application/reactflow');
      console.log('Node type:', nodeType);

      if (typeof nodeType === 'undefined' || !nodeType) {
        console.log('No valid node type');
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      console.log('Position:', position);

      const newNode = createNode(nodeType as NodeType, position);
      console.log('Created node:', newNode);

      if (propOnNodesChange) {
        console.log('Using prop handler');
        const newNodes = [...nodes, newNode];
        propOnNodesChange([{ type: 'add', item: newNode }] as NodeChange[]);
      } else {
        console.log('Using internal handler, current nodes:', nodes.length);
        setInternalNodes((nds) => {
          console.log('Adding node to internal nodes:', nds.length + 1);
          return [...nds, newNode];
        });
      }
    },
    [screenToFlowPosition, nodes, propOnNodesChange, setInternalNodes]
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
      </ReactFlow>
    </div>
  );
}
