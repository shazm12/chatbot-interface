import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useFlowContext } from "@/contexts/FlowContext";
import { getNodeConfig } from "@/config/node-configs";


export function GenericNode({ data, id, type }: NodeProps): React.JSX.Element {
  const { setSelectedNodeId } = useFlowContext();
  const nodeConfig = getNodeConfig(type as any);
  
  const handleNodeClick = (): void => {
    setSelectedNodeId(id);
  };

  if (!nodeConfig) {
    // Fallback for unknown node types
    return (
      <div className="min-w-[200px] bg-white border-2 border-red-200 rounded-lg shadow-sm p-3">
        <div className="text-sm font-medium text-red-700">Unknown Node Type: {type}</div>
      </div>
    );
  }

  const IconComponent = nodeConfig.icon;

  return (
    <div 
      onClick={handleNodeClick}
      className="min-w-[200px] bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Node Header */}
      <div className="bg-blue-50 px-3 py-2 rounded-t-lg border-b border-gray-100">
        <div className="flex items-center gap-2">
          <IconComponent className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            {(data as any)?.label || nodeConfig.label}
          </span>
        </div>
      </div>

      {/* Node Content */}
      <div className="p-3">
        <div className="text-sm text-gray-600">
          {renderNodeContent(data, nodeConfig)}
        </div>
      </div>

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-green-400 border-2 border-white"
        isConnectable
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-400 border-2 border-white"
        isConnectable
      />
    </div>
  );
}

// Renders appropriate content based on node type and data
function renderNodeContent(data: any, nodeConfig: any): string {
  // Try to get content from data first, then fall back to default data
  if (data?.content) return data.content;
  if (data?.title) return data.title;
  if (data?.condition) return data.condition;
  if (data?.action) return data.action;
  if (data?.placeholder) return data.placeholder;
  
  // Fallback to first non-label property from default data
  const defaultData = nodeConfig.defaultData;
  for (const [key, value] of Object.entries(defaultData)) {
    if (key !== 'label' && typeof value === 'string') {
      return value;
    }
  }
  
  return 'Click to edit...';
}
