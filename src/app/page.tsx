"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { TopBar } from "@/components/layout/top-bar";
import { SidePanel } from "@/components/panels/side-panel";
import { FlowCanvas } from "@/components/canvas/flow-canvas";
import { AppState, FlowNode, FlowEdge, Message, SaveHandler, MessageHandler } from "@/types";



interface LayoutStyles {
  container: string;
  mainContent: string;
  canvasArea: string;
}

const initialAppState: AppState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  hasUnsavedChanges: false,
  isLoading: false,
};

export default function Home(): React.JSX.Element {
  // Application state management with proper typing
  const [appState, setAppState] = useState<AppState>(initialAppState);
  const [messages, setMessages] = useState<Message[]>([]);

  // Memoized layout styles
  const layoutStyles: LayoutStyles = useMemo(() => ({
    container: "h-screen w-full flex flex-col bg-gray-50",
    mainContent: "flex-1 flex",
    canvasArea: "flex-1"
  }), []);


  const { nodes, edges, hasUnsavedChanges, isLoading } = appState;

  return (
    <div className={`${layoutStyles.container}`}>
      {/* Top Bar */}
      <TopBar 
        isSaving={isLoading}
        hasChanges={hasUnsavedChanges}
      />
      
      {/* Main Content Area */}
      <div className={layoutStyles.mainContent}>
        {/* Canvas Area */}
        <div className={layoutStyles.canvasArea}>
          <FlowCanvas 
            nodes={nodes}
            edges={edges}
          />
        </div>
        
        {/* Right Side Panel */}
        <SidePanel 
          isLoading={isLoading}
          messages={messages}
        />
      </div>
    </div>
  );
}