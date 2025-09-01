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
  selectedNodeId: string | null;
  setSelectedNodeId: (nodeId: string | null) => void;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
  saveChanges: () => Promise<void>;
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
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState<boolean>(false);

  const saveChanges = React.useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNodesChange: OnNodesChange = React.useCallback(
    (changes) => {
      onNodesChange(changes);
      // Check if there are meaningful changes (not just selection/position)
      const hasStructuralChanges = changes.some(
        (change) => change.type === 'add' || change.type === 'remove' || change.type === 'dimensions'
      );


      if (hasStructuralChanges) {
        setHasUnsavedChanges(true);
      }
    },
    [onNodesChange, setHasUnsavedChanges]
  );

  const handleEdgesChange: OnEdgesChange = React.useCallback(
    (changes) => {
      onEdgesChange(changes);

      const hasStructuralChanges = changes.some(
        (change) => change.type === 'add' || change.type === 'remove' || change.type === "replace"
      );

      if (hasStructuralChanges) {
        setHasUnsavedChanges(true);
      }
    },
    [onEdgesChange, setHasUnsavedChanges]
  );

  const contextValue: FlowContextType = {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange: handleNodesChange,
    onEdgesChange: handleEdgesChange,
    selectedNodeId,
    setSelectedNodeId,
    isLoading,
    hasUnsavedChanges,
    saveChanges,
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
