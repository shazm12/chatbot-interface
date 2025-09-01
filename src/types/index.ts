// Common types for the chatbot application

import { 
  Node, 
  Edge, 
  NodeChange, 
  EdgeChange, 
  Connection 
} from '@xyflow/react';

// Button component types
export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

// Panel component types
export interface PanelProps {
  className?: string;
  children?: React.ReactNode;
}

// Flow-specific types extending React Flow types
export interface FlowNode extends Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
    content?: string;
    [key: string]: any;
  };
}

export interface FlowEdge extends Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  label?: string;
}

// Canvas component types
export interface CanvasProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodesChange?: (changes: NodeChange[]) => void;
  onEdgesChange?: (changes: EdgeChange[]) => void;
  onConnect?: (connection: Connection) => void;
}

// Layout component types
export interface TopBarProps {
  onSave?: SaveHandler;
  isSaving?: boolean;
  hasChanges?: boolean;
}

export interface SidePanelProps {
  onSendMessage?: MessageHandler;
  isLoading?: boolean;
  messages?: Message[];
}

// Message types
export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'bot';
  type?: 'text' | 'image' | 'file';
  metadata?: Record<string, any>;
}

// Icon component types
export interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

// Event handler types
export type ClickHandler = () => void;
export type AsyncClickHandler = () => Promise<void>;
export type MessageHandler = (message: string) => void;
export type SaveHandler = () => void | Promise<void>;
export type NodeChangeHandler = (changes: NodeChange[]) => void;
export type EdgeChangeHandler = (changes: EdgeChange[]) => void;
export type ConnectionHandler = (connection: Connection) => void;

// Component state types
export interface AppState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNode: FlowNode | null;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  error?: string | null;
}

// Form types
export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  values: Record<string, any>;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  border: string;
}

// Layout types
export interface LayoutConfig {
  topBarHeight: number;
  sidePanelWidth: number;
  canvasMinHeight: number;
}

// Configuration types
export interface AppConfig {
  theme: ThemeColors;
  layout: LayoutConfig;
  features: {
    autoSave: boolean;
    realTimeSync: boolean;
    keyboardShortcuts: boolean;
  };
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
