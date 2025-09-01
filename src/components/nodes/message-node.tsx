import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageCircle } from "lucide-react";
import { useFlowContext } from "@/contexts/FlowContext";

export function MessageNode({ data, id }: NodeProps): React.JSX.Element {
  const { setSelectedNodeId } = useFlowContext();
  
  const handleNodeClick = (): void => {
    setSelectedNodeId(id);
  };

  return (
    <div 
      onClick={handleNodeClick}
      className="min-w-[200px] bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Node Header */}
      <div className="bg-blue-50 px-3 py-2 rounded-t-lg border-b border-gray-100">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            {(data as any)?.label || 'Message'}
          </span>
        </div>
      </div>

      {/* Node Content */}
      <div className="p-3">
        <div className="text-sm text-gray-600">
          {(data as any)?.content || 'Click to edit message...'}
        </div>
      </div>

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-green-400 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-400 border-2 border-white"
      />
    </div>
  );
}