"use client";

import React, { useMemo } from 'react';
import { TopBar } from "@/components/layout/top-bar";
import { SidePanel } from "@/components/panels/side-panel";
import { FlowCanvas } from "@/components/canvas/flow-canvas";
import { ReactFlowProvider } from '@xyflow/react';
import { FlowProvider } from "@/contexts/FlowContext";



interface LayoutStyles {
  container: string;
  mainContent: string;
  canvasArea: string;
}

export default function Home(): React.JSX.Element {
  const layoutStyles: LayoutStyles = useMemo(() => ({
    container: "h-screen w-full flex flex-col bg-gray-50",
    mainContent: "flex-1 flex",
    canvasArea: "flex-1"
  }), []);

  return (
    <div className={`${layoutStyles.container}`}>
      <ReactFlowProvider>
        <FlowProvider>
          {/* Top Bar */}
          <TopBar />
          {/* Main Content Area */}
          <div className={layoutStyles.mainContent}>
            {/* Canvas Area */}
            <div className={layoutStyles.canvasArea}>
              <FlowCanvas />
            </div>
            
            {/* Right Side Panel */}
            <SidePanel />
          </div>
        </FlowProvider>
      </ReactFlowProvider>
    </div>
  );
}