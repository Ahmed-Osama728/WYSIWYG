import React from 'react';
import { ToolbarProps } from '../types/types';
import { ToolbarButton } from './ToolbarButton';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
];

export const Toolbar: React.FC<ToolbarProps> = ({ onToggle, hasStyle }) => (
  <div className="toolbar">
    {INLINE_STYLES.map((type) => (
      <ToolbarButton
        key={type.style}
        active={hasStyle(type.style)}
        label={type.label}
        onToggle={onToggle}
        style={type.style}
      />
    ))}
  </div>
);
