"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Send, LucideIcon } from "lucide-react";
import { SidePanelProps, ClickHandler, Message, IconProps } from "@/types";

interface SidePanelComponentProps extends SidePanelProps {
  className?: string;
}

interface PanelHeaderProps {
  title: string;
  icon: LucideIcon;
  onSendMessage: ClickHandler;
  isLoading: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ 
  title, 
  icon: Icon, 
  onSendMessage, 
  isLoading 
}): React.JSX.Element => {
  const iconSize: number = 16;
  const logoSize: number = 32;
  
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Icon className={`w-4 h-4 text-green-600`} size={iconSize} />
        </div>
        <span className="font-medium text-gray-700">{title}</span>
      </div>
      
      <Button 
        onClick={onSendMessage}
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" size={iconSize} />
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </div>
  );
};

const MessageList: React.FC<MessageListProps> = ({ messages }): React.JSX.Element => {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>No messages yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {messages.map((message: Message) => (
        <div key={message.id} className="p-2 rounded bg-gray-50">
          <p className="text-sm">{message.content}</p>
          <span className="text-xs text-gray-400">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function SidePanel({ 
  onSendMessage, 
  isLoading = false, 
  messages = [],
  className = ""
}: SidePanelComponentProps): React.JSX.Element {
  
  const handleSendMessage: ClickHandler = (): void => {
    if (onSendMessage) {
      onSendMessage(""); // Empty message for now, will be replaced with actual input
    } else {
      // TODO: Implement send message functionality
      console.log("Send message clicked");
    }
  };

  const panelTitle: string = "Message Panel";
  const panelWidth: string = "w-80";

  return (
    <div className={`${panelWidth} h-full bg-white border-l border-gray-200 flex flex-col ${className}`}>
      {/* Panel Header */}
      <PanelHeader 
        title={panelTitle}
        icon={Send}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
      
      {/* Panel Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <MessageList messages={messages} />
      </div>
    </div>
  );
}
