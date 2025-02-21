import React, { useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { WYSIWYGEditorProps } from '../types/types';
import { Toolbar } from '../Toolbar/Toolbar';
import 'draft-js/dist/Draft.css';

export const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({
  value,
  onChange,
  className = '',
  style,
  renderToolbar,
  placeholder = 'Start typing...',
}) => {
  const [editorState, setEditorState] = useState(() =>
    value ? value : EditorState.createEmpty()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async loading behaviour for value prop
    const timer = setTimeout(() => {
      if (value) {
        setEditorState(value);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const handleChange = (newState: EditorState) => {
    setEditorState(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    const updatedState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
    handleChange(updatedState);
  };

  const hasInlineStyle = (inlineStyle: string) =>
    editorState.getCurrentInlineStyle().has(inlineStyle);

  const toolbarProps = {
    editorState,
    onToggle: toggleInlineStyle,
    hasStyle: hasInlineStyle,
  };

  if (loading) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className={`wysiwyg-editor ${className}`} style={style}>
      {renderToolbar ? renderToolbar(toolbarProps) : <Toolbar {...toolbarProps} />}
      <div
        className="wysiwyg-editor__content"
        onClick={() => {
          if (!editorState.getSelection().getHasFocus()) {
            setEditorState(EditorState.moveFocusToEnd(editorState));
          }
        }}
      >
        <Editor
          editorState={editorState}
          onChange={handleChange}
          placeholder={placeholder}
          handleKeyCommand={(command, editorState) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
              handleChange(newState);
              return 'handled';
            }
            return 'not-handled';
          }}
        />
      </div>
    </div>
  );
};
