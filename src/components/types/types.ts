import { EditorState } from 'draft-js';
import { CSSProperties, ReactNode } from 'react';

export interface WYSIWYGEditorProps {
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  className?: string;
  style?: CSSProperties;
  renderToolbar?: (props: ToolbarProps) => ReactNode;
  placeholder?: string;
}

export interface ToolbarProps {
  editorState: EditorState;
  onToggle: (style: string) => void;
  hasStyle: (style: string) => boolean;
}

export interface ToolbarButtonProps {
  active: boolean;
  label: string;
  style: string;
  onToggle: (style: string) => void;
}