import { NodeType, NodeConfig } from "@/types";
import { MessageSquare, User } from "lucide-react";

// Centralized node configurations
export const nodeConfigs: Record<NodeType, NodeConfig> = {
  [NodeType.MESSAGE]: {
    type: NodeType.MESSAGE,
    label: 'Message',
    icon: MessageSquare,
    defaultData: {
      label: 'Message',
      content: 'Enter your message here...'
    },
  },
  [NodeType.USER]: {
    type: NodeType.USER,
    label: 'User',
    icon: User,
    defaultData: {
      label: 'User',
      title: 'User'
    },
  }
};

// Helper functions for the node configs
export const getNodeConfig = (type: NodeType): NodeConfig => {
  return nodeConfigs[type];
};

export const getAvailableNodeTypes = (): NodeType[] => {
  return Object.values(NodeType);
};

export const createDefaultNodeData = (type: NodeType): Record<string, any> => {
  return nodeConfigs[type].defaultData;
};
