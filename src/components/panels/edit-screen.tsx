"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFlowContext } from "@/contexts/FlowContext";
import { NodeType } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface EditScreenProps {
  onBack: () => void;
}

export function EditScreen({ onBack }: EditScreenProps): React.JSX.Element {
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
          } else if (node.type === NodeType.USER) {
            return {
              ...node,
              data: {
                ...node.data,
                title: messageText,
              },
            };
          }
        }
        return node;
      })
    );

    setSelectedNodeId(null);
    onBack(); // Go back to nodes screen after saving
  };

  // Cancels editing and deselects the node
  const handleCancel = (): void => {
    setSelectedNodeId(null);
    onBack(); // Go back to nodes screen after canceling
  };

  if (!selectedNodeId) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select a node to edit its content
      </div>
    );
  }


  const selectedNode = nodes.find(node => node.id === selectedNodeId);
  const nodeTypeLabel = selectedNode?.type === NodeType.MESSAGE ? 'Message' : 'User';
  
  if(selectedNode?.type !== NodeType.MESSAGE) {
    return (
      <div className="p-4 text-center text-gray-500">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 h-auto"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        Cannot edit {selectedNode?.type} node type 
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 h-auto"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-sm font-medium text-gray-700">Edit {nodeTypeLabel} Node</h3>
      </div>
      
      <div className="space-y-3">
        <Input
          type="text"
          value={messageText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
          placeholder={`Enter ${nodeTypeLabel.toLowerCase()} content...`}
          className="w-full"
        />
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSave}
            disabled={isLoading || !messageText.trim()}
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
  );
}
