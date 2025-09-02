"use client";

import React, { useState, useEffect } from 'react';
import { useFlowContext } from "@/contexts/FlowContext";
import { NodesScreen } from "./nodes-screen";
import { EditScreen } from "./edit-screen";

interface SidePanelComponentProps {
  className?: string;
}


export function SidePanel({ 
  className = ""
}: SidePanelComponentProps): React.JSX.Element {
  
  const { selectedNodeId } = useFlowContext();
  const [currentScreen, setCurrentScreen] = useState<'nodes' | 'edit'>('nodes');

  // Automatically switch to edit screen when a node is selected
  useEffect(() => {
    if (selectedNodeId) {
      setCurrentScreen('edit');
    }
  }, [selectedNodeId]);

  const panelWidth: string = "w-80";

  return (
    <div className={`${panelWidth} h-full bg-white border-l border-gray-200 flex flex-col ${className}`}>
      {currentScreen === 'nodes' && (
        <NodesScreen />
      )}
      
      {currentScreen === 'edit' && (
        <EditScreen />
      )}
    </div>
  );
}
