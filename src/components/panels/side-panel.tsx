"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { SidePanelProps, ClickHandler, NodeType } from "@/types";

interface SidePanelComponentProps extends SidePanelProps {
  className?: string;
}

export function SidePanel({ 
  isLoading = false,
  className = ""
}: SidePanelComponentProps): React.JSX.Element {
  
  const handleSendMessage: ClickHandler = (): void => {
    console.log("Send message clicked");
  };

  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>): void => {
    console.log('Drag started with node type:', NodeType.MESSAGE);
    event.dataTransfer.setData('application/reactflow', NodeType.MESSAGE);
    event.dataTransfer.effectAllowed = 'move';
  };

  

  const panelWidth: string = "w-80";

  return (
    <div className={`${panelWidth} h-full bg-white border-l border-gray-200 flex flex-col ${className}`}>

      <div className="p-4">
        <Button 
          draggable
          onDragStart={handleDragStart}
          onClick={handleSendMessage}
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-grab active:cursor-grabbing"
        >
          <MessageCircle className="w-4 h-4" />
          Message
        </Button>
      </div>
    </div>
  );
}
