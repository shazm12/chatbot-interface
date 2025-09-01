"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { NodeType } from "@/types";

export function NodesScreen(): React.JSX.Element {
  
  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>): void => {
    event.dataTransfer.setData('application/reactflow', NodeType.MESSAGE);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Drag to add nodes</h3>
        
        <Button 
          draggable
          onDragStart={handleDragStart}
          className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 cursor-grab active:cursor-grabbing"
        >
          <MessageCircle className="w-4 h-4" />
          Message
        </Button>
      </div>
    </div>
  );
}
