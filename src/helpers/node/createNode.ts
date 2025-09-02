import { NodeType } from "@/types";
import { createDefaultNodeData } from "@/config/node-configs";

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