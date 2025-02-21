import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarProps } from '../types/types';
import '@testing-library/jest-dom';
import { EditorState } from 'draft-js';

const mockOnToggle = jest.fn();
const mockHasStyle = jest.fn((style) => style === 'BOLD');

const renderToolbar = (props: Partial<ToolbarProps> = {}) => {
  const defaultProps: ToolbarProps = {
    editorState: { getCurrentContent: jest.fn() } as unknown as EditorState, 
    onToggle: mockOnToggle,
    hasStyle: mockHasStyle,
  };
  return render(<Toolbar {...defaultProps} {...props} />);
};

describe('Toolbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all toolbar buttons', () => {
    renderToolbar();

    const boldButton = screen.getByRole('button', { name: /bold/i });
    const italicButton = screen.getByRole('button', { name: /italic/i });
    const underlineButton = screen.getByRole('button', { name: /underline/i });

    expect(boldButton).toBeInTheDocument();
    expect(italicButton).toBeInTheDocument();
    expect(underlineButton).toBeInTheDocument();
  });

  test('applies "active" class to buttons with active styles', () => {
    renderToolbar();

    const boldButton = screen.getByRole('button', { name: /bold/i });
    const italicButton = screen.getByRole('button', { name: /italic/i });

    expect(boldButton).toHaveClass('toolbar-button--active');
    expect(italicButton).not.toHaveClass('toolbar-button--active');
  });

  test('calls onToggle with correct style when a button is clicked', () => {
    renderToolbar();

    const boldButton = screen.getByRole('button', { name: /bold/i });
    fireEvent.mouseDown(boldButton);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith('BOLD');
  });

  test('prevents default behavior on button mousedown', () => {
    renderToolbar();
  
    const boldButton = screen.getByRole('button', { name: /bold/i });
  
    const preventDefaultSpy = jest.fn();
    boldButton.addEventListener('mousedown', (e) => e.preventDefault = preventDefaultSpy);
  
    fireEvent.mouseDown(boldButton);
  
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });
  
});
