"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { TopBarProps, ClickHandler } from "@/types";

interface TopBarComponentProps extends TopBarProps {
  className?: string;
}

export function TopBar({ 
  onSave, 
  isSaving = false, 
  hasChanges = false,
  className = ""
}: TopBarComponentProps): React.JSX.Element {
  
  const handleSaveChanges: ClickHandler = (): void => {
    if (onSave) {
      onSave();
    } else {
      // TODO: Implement save functionality
    }
  };

  const buttonText: string = isSaving ? "Saving..." : "Save Changes";
  const isDisabled: boolean = isSaving || !hasChanges;

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
