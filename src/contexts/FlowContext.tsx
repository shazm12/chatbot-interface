"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  OnNodesChange,
  OnEdgesChange,
} from '@xyflow/react';

interface FlowContextType {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

interface FlowProviderProps {
  children: ReactNode;
}

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export function FlowProvider({ children }: FlowProviderProps): React.JSX.Element {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const contextValue: FlowContextType = {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  };

  return (
    <FlowContext.Provider value={contextValue}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlowContext(): FlowContextType {
  const context = useContext(FlowContext);
  
  if (context === undefined) {
    throw new Error('useFlowContext must be used within a FlowProvider');
  }
  
  return context;
}
