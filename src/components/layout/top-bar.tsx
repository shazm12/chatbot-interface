"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { useFlowContext } from "@/contexts/FlowContext";

interface TopBarComponentProps {
  className?: string;
}

export function TopBar({ 
  className = ""
}: TopBarComponentProps): React.JSX.Element {
  
  const { isLoading, hasUnsavedChanges, saveChanges } = useFlowContext();
  
  const handleSaveChanges = (): void => {
    saveChanges();
  };

  const buttonText: string = isLoading ? "Saving..." : "Save Changes";
  const isDisabled: boolean = isLoading || !hasUnsavedChanges;

  return (
    <div className={`w-full h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 ${className}`}>
      <Button 
        onClick={handleSaveChanges}
        disabled={isDisabled}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {buttonText}
      </Button>
    </div>
  );
}
