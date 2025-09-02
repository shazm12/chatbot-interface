"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { NodeType } from "@/types";
import { nodeConfigs, getAvailableNodeTypes } from "@/config/node-configs";


export function NodesScreen(): React.JSX.Element {
  
  // Sets drag data for React Flow when dragging starts
  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>, nodeType: NodeType): void => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Drag to add nodes</h3>
        
        <div className="space-y-3">
          {getAvailableNodeTypes().map((nodeType) => {
            const config = nodeConfigs[nodeType];
            const IconComponent = config.icon;
            
            return (
              <Button 
                key={nodeType}
                draggable
                onDragStart={(e) => handleDragStart(e, nodeType)}
                className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 cursor-grab active:cursor-grabbing"
              >
                <IconComponent className="w-4 h-4" />
                {config.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
