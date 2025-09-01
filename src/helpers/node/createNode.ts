import { NodeType } from "@/types";

export const createNode = (nodeType: NodeType, position?: { x: number, y: number }) => {
    return {
        id: crypto.randomUUID(),
        type: nodeType, // Use the actual node type for React Flow
        position: position ?? { x: 0 , y: 0},
        data : {
            type: nodeType,
            label: nodeType === NodeType.MESSAGE ? 'Message' : 'Node',
            content: nodeType === NodeType.MESSAGE ? 'Enter your message here...' : 'Node content'
        }
    }
}