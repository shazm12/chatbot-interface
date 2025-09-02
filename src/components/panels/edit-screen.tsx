"use client";

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useFlowContext } from "@/contexts/FlowContext";

interface EditScreenProps {
  onBack: () => void;
}

export function EditScreen({ onBack }: EditScreenProps): React.JSX.Element {
  const { nodes, setNodes, selectedNodeId, setSelectedNodeId, isLoading } = useFlowContext();
  

  const selectedNode = nodes.find(node => node.id === selectedNodeId);  

  const [messageText, setMessageText] = useState<string>(selectedNode?.data?.content as string);

  const handleSave = useCallback(() => {
    if (!selectedNodeId) return;
    
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === selectedNodeId 
          ? { 
              ...node, 
              data: { 
                ...node.data, 
                content: messageText
              } 
            }
          : node
      )
    );
    onBack();
  }, [selectedNodeId, messageText, setNodes, onBack]);

  const handleCancel = useCallback(() => {
    setSelectedNodeId(null);
    onBack();
  }, [setSelectedNodeId, onBack]);

  if (!selectedNode) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-500">
          <p>No node selected</p>
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mt-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button 
          onClick={handleCancel}
          variant="ghost" 
          size="sm"
          className="p-1"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-sm font-medium text-gray-700">Edit Message</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="message-text" className="block text-sm font-medium text-gray-700 mb-1">
            Message Text
          </label>
          <Input
            id="message-text"
            type="text"
            value={messageText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
            placeholder="Enter your message..."
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
          <Button 
            onClick={handleCancel}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
