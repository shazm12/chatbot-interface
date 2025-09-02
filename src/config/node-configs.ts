import { NodeType, NodeConfig } from "@/types";
import { MessageSquare, User } from "lucide-react";

// Centralized configuration for all available node types
export const nodeConfigs: Record<NodeType, NodeConfig> = {
  [NodeType.MESSAGE]: {
    type: NodeType.MESSAGE,
    label: 'Message',
    icon: MessageSquare,
    defaultData: {
      label: 'Message',
      content: 'Enter your message here...'
    }
  },
  [NodeType.USER]: {
    type: NodeType.USER,
    label: 'User',
    icon: User,
    defaultData: {
      label: 'User',
      title: 'User'
    }
  }
};

// Helper function to get node config by type
export const getNodeConfig = (type: NodeType): NodeConfig => {
  return nodeConfigs[type];
};

// Helper function to get all available node types
export const getAvailableNodeTypes = (): NodeType[] => {
  return Object.values(NodeType);
};

// Helper function to create default node data
export const createDefaultNodeData = (type: NodeType): Record<string, any> => {
  return nodeConfigs[type].defaultData;
};
