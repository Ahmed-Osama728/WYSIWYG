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
    EditorState.createEmpty()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        setEditorState(value);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const handleChange = (newState: EditorState) => {
    if (onChange) {
      onChange(newState);
    } else {
      setEditorState(newState);
    }
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    const currentState = value || editorState;
    handleChange(RichUtils.toggleInlineStyle(currentState, inlineStyle));
  };

  const hasInlineStyle = (inlineStyle: string) => {
    const currentStyle = (value || editorState).getCurrentInlineStyle();
    return currentStyle.has(inlineStyle);
  };

  if (loading) {
    return <div>Loading editor...</div>;
  }

  const toolbarProps = {
    editorState: value || editorState,
    onToggle: toggleInlineStyle,
    hasStyle: hasInlineStyle,
  };

  return (
    <div className={`wysiwyg-editor ${className}`} style={style}>
      {renderToolbar ? renderToolbar(toolbarProps) : <Toolbar {...toolbarProps} />}
      <div className="wysiwyg-editor__content">
        <Editor
          editorState={value || editorState}
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