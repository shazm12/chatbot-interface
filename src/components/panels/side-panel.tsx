"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { SidePanelProps, ClickHandler } from "@/types";

interface SidePanelComponentProps extends SidePanelProps {
  className?: string;
}

export function SidePanel({ 
  onSendMessage, 
  isLoading = false,
  className = ""
}: SidePanelComponentProps): React.JSX.Element {
  
  const handleSendMessage: ClickHandler = (): void => {
    if (onSendMessage) {
      onSendMessage("");
    } else {
      // TODO: Implement send message functionality
      console.log("Send message clicked");
    }
  };

  const panelWidth: string = "w-80";

  return (
    <div className={`${panelWidth} h-full bg-white border-l border-gray-200 flex flex-col ${className}`}>

      <div className="p-4">
        <Button 
          onClick={handleSendMessage}
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          Message
        </Button>
      </div>
    </div>
  );
}
