"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useFlowContext } from "@/contexts/FlowContext";
import { toast } from 'sonner';

interface TopBarComponentProps {
  className?: string;
}

export function TopBar({ 
  className = ""
}: TopBarComponentProps): React.JSX.Element {
  
  const { isLoading, hasUnsavedChanges, saveChanges } = useFlowContext();

  const [error, setError] = useState<string | null>(null);

  const handleSaveChanges = async (): Promise<void> => {
    setError(null);
    const result = await saveChanges();
    if(result.isValid) {
      toast.success('Changes saved successfully');
    } else {
      setError(result.error ?? "Unknown error");
    }
  };

  const buttonText: string = isLoading ? "Saving..." : "Save Changes";
  const isDisabled: boolean = isLoading || !hasUnsavedChanges;

  return (
    <div className={`w-full h-16 bg-white border-b border-gray-200 flex items-center px-6 ${className}`}>
      {/* Centered error message */}
      <div className="flex-1 flex justify-center">
        {error && (
          <div className="p-2 bg-red-500 text-white rounded text-lg font-bold">
            {error}
          </div>
        )}
      </div>
      {/* Save Changes button */}
      <div className="flex-shrink-0">
        <Button 
          onClick={handleSaveChanges}
          disabled={isDisabled}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
