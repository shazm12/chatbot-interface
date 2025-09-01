"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { TopBar } from "@/components/layout/top-bar";
import { SidePanel } from "@/components/panels/side-panel";
import { FlowCanvas } from "@/components/canvas/flow-canvas";
import { Message } from "@/types";
import { ReactFlowProvider } from '@xyflow/react';
import { FlowProvider } from "@/contexts/FlowContext";



interface LayoutStyles {
  container: string;
  mainContent: string;
  canvasArea: string;
}

export default function Home(): React.JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading] = useState<boolean>(false);
  const [hasUnsavedChanges] = useState<boolean>(false);

  const layoutStyles: LayoutStyles = useMemo(() => ({
    container: "h-screen w-full flex flex-col bg-gray-50",
    mainContent: "flex-1 flex",
    canvasArea: "flex-1"
  }), []);

  return (
    <div className={`${layoutStyles.container}`}>
      {/* Top Bar */}
      <TopBar 
        isSaving={isLoading}
        hasChanges={hasUnsavedChanges}
      />
      
      {/* Main Content Area */}
      <ReactFlowProvider>
        <FlowProvider>
          <div className={layoutStyles.mainContent}>
            {/* Canvas Area */}
            <div className={layoutStyles.canvasArea}>
              <FlowCanvas />
            </div>
            
            {/* Right Side Panel */}
            <SidePanel 
              isLoading={isLoading}
              messages={messages}
            />
          </div>
        </FlowProvider>
      </ReactFlowProvider>
    </div>
  );
}