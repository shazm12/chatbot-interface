"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFlowContext } from "@/contexts/FlowContext";
import { NodeType } from '@/types';

export function EditScreen(): React.JSX.Element {
  const { nodes, setNodes, selectedNodeId, setSelectedNodeId, isLoading } = useFlowContext();
  const [messageText, setMessageText] = useState<string>('');

  // Find the selected node and update local state
  useEffect(() => {
    if (selectedNodeId) {
      const selectedNode = nodes.find(node => node.id === selectedNodeId);
      if (selectedNode?.type === NodeType.MESSAGE) {
        setMessageText(selectedNode.data?.content as string || '');
      } else if (selectedNode?.type === NodeType.USER) {
        setMessageText(selectedNode.data?.title as string || '');
      }
    }
  }, [selectedNodeId, nodes]);

  // Updates the selected node's content in the global state
  const handleSave = (): void => {
    if (!selectedNodeId) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          if (node.type === NodeType.MESSAGE) {
            return {
              ...node,
              data: {
                ...node.data,
                content: messageText,
              },
            };
          }
        }
        return node;
      })
    );

    setSelectedNodeId(null);
  };

  // Cancels editing and deselects the node
  const handleCancel = (): void => {
    setSelectedNodeId(null);
  };

  if (!selectedNodeId) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select a node to edit its content
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Edit Node Content</h3>
        
        <div className="space-y-3">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Enter node content..."
            className="w-full"
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
