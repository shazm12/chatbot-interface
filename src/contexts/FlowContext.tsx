"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  OnNodesChange,
  OnEdgesChange,
  Connection,
  getOutgoers,
} from '@xyflow/react';
import { GraphValidation } from '@/types';

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
  saveChanges: () => Promise<GraphValidation>;
  validateConnection: (connection: Connection) => boolean;
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

  // Validates chatbot flow graph structure
  const validateGraph = React.useCallback(
    (): GraphValidation => {
      if (nodes.length === 0) {
        return {
          isValid: false,
          error: "No nodes in the graph"
        };
      }
      if (edges.length === 0) {
        return {
          isValid: false,
          error: "No edges in the graph"
        };
      };

      // Chatbot flow must have only one entry point (no target handle)
      const nodesWithNoTargetHandle = nodes.filter((node) => !edges.some((edge) => edge.target === node.id));
      if (nodesWithNoTargetHandle.length > 1) {
        return {
          isValid: false,
          error: "More than one node with no target handle"
        };
      }

      return {
        isValid: true,
        error: undefined
      };
    },
    [nodes, edges]
  );

  const saveChanges = React.useCallback(async (): Promise<GraphValidation> => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const validationData = validateGraph();
    setIsLoading(false);
    return validationData;
  }, [validateGraph]);

  // Tracks node changes and sets unsaved changes flag
  const handleNodesChange: OnNodesChange = React.useCallback(
    (changes) => {
      onNodesChange(changes);

      const hasStructuralChanges = changes.some(
        (change) => change.type === 'add' || change.type === 'remove' || change.type === 'dimensions'
      );

      if (hasStructuralChanges) {
        setHasUnsavedChanges(true);
      }
    },
    [onNodesChange, setHasUnsavedChanges]
  );

  // Tracks edge changes and sets unsaved changes flag
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
  
  // Detects cycles in the flow
  const hasCycle = (node: Node, connection: Connection, visited = new Set<string>()): boolean => {
    if (!node) return false;
    if (visited.has(node.id)) return false;

    visited.add(node.id);

    for (const outgoer of getOutgoers(node, nodes, edges)) {
      if (outgoer.id === connection.source) return true;
      if (hasCycle(outgoer, connection, visited)) return true;
    }

    return false;
  };
  // Prevents invalid connections in chatbot flow
  const validateConnection = React.useCallback(
    (connection: Connection): boolean => {
      // Prevent self-connections
      if (connection.source === connection.target) {
        return false;
      }

      // Prevent duplicate connections
      if (
        edges.some(
          (edge) =>
            edge.source === connection.source &&
            edge.target === connection.target
        )
      ) {
        return false;
      }

      const target = nodes.find((node) => node.id === connection.target);

      if (hasCycle(target as Node, connection)) {
        return false;
      }

      return true;
    },
    [nodes, edges, hasCycle]
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
    validateConnection,
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
