import React from 'react';
import { MessageNode } from "./message-node";
import { UserNode } from "./user-node";
import { NodeType } from "@/types";
import { NodeProps } from "@xyflow/react";


export const nodeTypes = {
  [NodeType.MESSAGE]: MessageNode,
  [NodeType.USER]: UserNode
} satisfies Record<NodeType, React.FC<NodeProps>>;

export default nodeTypes;