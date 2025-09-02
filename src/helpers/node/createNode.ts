import { NodeType } from "@/types";
import { createDefaultNodeData } from "@/config/node-configs";

// Creates a new node with type-specific default data for chatbot flow
export const createNode = (nodeType: NodeType, position?: { x: number, y: number }) => {
    return {
        id: crypto.randomUUID(),
        type: nodeType, 
        position: position ?? { x: 0 , y: 0},
        data: {
            type: nodeType,
            ...createDefaultNodeData(nodeType)
        }
    };
};