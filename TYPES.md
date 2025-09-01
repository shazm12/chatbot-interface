# TypeScript Types Documentation

This document outlines all the TypeScript types and interfaces used throughout the Bitespeed Chatbot application.

## Core Types Location

All shared types are defined in `/src/types/index.ts` for better organization and reusability.

## Component Types

### Button Types
```typescript
export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
```

### Layout Component Types

#### TopBar
```typescript
export interface TopBarProps {
  onSave?: SaveHandler;
  isSaving?: boolean;
  hasChanges?: boolean;
}

interface TopBarComponentProps extends TopBarProps {
  className?: string;
}
```

#### SidePanel
```typescript
export interface SidePanelProps {
  onSendMessage?: MessageHandler;
  isLoading?: boolean;
  messages?: Message[];
}

interface SidePanelComponentProps extends SidePanelProps {
  className?: string;
}
```

### Canvas Types

#### FlowCanvas
```typescript
export interface CanvasProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodesChange?: (changes: NodeChange[]) => void;
  onEdgesChange?: (changes: EdgeChange[]) => void;
  onConnect?: (connection: Connection) => void;
}

interface FlowCanvasComponentProps extends CanvasProps {
  className?: string;
  fitView?: boolean;
}
```

## Data Types

### Flow Elements
```typescript
export interface FlowNode extends Node {
  id: string;
  type: string;
  position: { x: number; y: number; };
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
```

### Messages
```typescript
export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'bot';
  type?: 'text' | 'image' | 'file';
  metadata?: Record<string, any>;
}
```

## Event Handler Types

```typescript
export type ClickHandler = () => void;
export type AsyncClickHandler = () => Promise<void>;
export type MessageHandler = (message: string) => void;
export type SaveHandler = () => void | Promise<void>;
export type NodeChangeHandler = (changes: NodeChange[]) => void;
export type EdgeChangeHandler = (changes: EdgeChange[]) => void;
export type ConnectionHandler = (connection: Connection) => void;
```

## Application State Types

### Main App State
```typescript
export interface AppState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNode: FlowNode | null;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  error?: string | null;
}
```

### Form State
```typescript
export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  values: Record<string, any>;
}
```

## Configuration Types

### Theme Configuration
```typescript
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  border: string;
}
```

### Layout Configuration
```typescript
export interface LayoutConfig {
  topBarHeight: number;
  sidePanelWidth: number;
  canvasMinHeight: number;
}
```

### App Configuration
```typescript
export interface AppConfig {
  theme: ThemeColors;
  layout: LayoutConfig;
  features: {
    autoSave: boolean;
    realTimeSync: boolean;
    keyboardShortcuts: boolean;
  };
}
```

## API Types

### Generic API Response
```typescript
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## Utility Types

```typescript
// Make specific keys optional
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific keys required
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Make all properties optional recursively
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

## Component-Specific Internal Types

### FlowCanvas Internal Types
```typescript
interface FlowStyles {
  background: string;
  controlsClass: string;
  minimapClass: string;
  minimapMaskColor: string;
  minimapNodeColor: string;
}

interface BackgroundConfig {
  variant: BackgroundVariant;
  gap: number;
  size: number;
  color: string;
}
```

### SidePanel Internal Types
```typescript
interface PanelHeaderProps {
  title: string;
  icon: LucideIcon;
  onSendMessage: ClickHandler;
  isLoading: boolean;
}

interface MessageListProps {
  messages: Message[];
}
```

### Home Page Internal Types
```typescript
interface HomePageProps {
  className?: string;
}

interface LayoutStyles {
  container: string;
  mainContent: string;
  canvasArea: string;
}
```

## Type Safety Benefits

1. **Compile-time Error Detection**: All component props, state, and function parameters are type-checked
2. **IntelliSense Support**: Better autocomplete and documentation in IDEs
3. **Refactoring Safety**: Changes to interfaces automatically highlight breaking changes
4. **Self-Documenting Code**: Types serve as inline documentation
5. **Consistent API Contracts**: Ensures all components follow the same interface patterns

## Usage Examples

### Using Event Handlers
```typescript
const handleSave: SaveHandler = async (): Promise<void> => {
  // Implementation with proper typing
};

const handleMessage: MessageHandler = (content: string): void => {
  // Implementation with proper typing
};
```

### Using Component Props
```typescript
<TopBar 
  onSave={handleSave}
  isSaving={isLoading}
  hasChanges={hasUnsavedChanges}
/>

<SidePanel 
  onSendMessage={handleMessage}
  isLoading={isLoading}
  messages={messages}
/>
```

### Using State with Proper Types
```typescript
const [appState, setAppState] = useState<AppState>(initialAppState);
const [messages, setMessages] = useState<Message[]>([]);
```

This comprehensive typing system ensures type safety throughout the entire application while maintaining flexibility for future enhancements.
