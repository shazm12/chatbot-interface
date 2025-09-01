"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { TopBar } from "@/components/layout/top-bar";
import { SidePanel } from "@/components/panels/side-panel";
import { FlowCanvas } from "@/components/canvas/flow-canvas";
import { AppState, FlowEdge, Message, SaveHandler, MessageHandler } from "@/types";
import { ReactFlowProvider } from '@xyflow/react';



interface LayoutStyles {
  container: string;
  mainContent: string;
  canvasArea: string;
}

const initialAppState: AppState = {
  nodes: [], // Remove test node for now
  edges: [],
  selectedNode: null,
  hasUnsavedChanges: false,
  isLoading: false,
};

export default function Home(): React.JSX.Element {

  const [appState, setAppState] = useState<AppState>(initialAppState);
  const [messages, setMessages] = useState<Message[]>([]);

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
      <ReactFlowProvider>
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
      </ReactFlowProvider>
    </div>
  );
}