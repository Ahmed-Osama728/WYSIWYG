import React from 'react';
import { ToolbarButtonProps } from '../types/types';

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  active,
  label,
  style,
  onToggle,
}) => (
  <button
    type="button"
    className={`toolbar-button ${active ? 'toolbar-button--active' : ''}`}
    onMouseDown={(e) => {
      e.preventDefault();
      onToggle(style);
    }}
  >
    {label}
  </button>
);
