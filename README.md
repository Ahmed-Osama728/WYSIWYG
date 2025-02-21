# WYSIWYG Editor Component

WYSIWYG Editor Component built with React, TypeScript, and Draft.js.

## Features

- Supports both controlled and uncontrolled modes
- Basic formatting options (Bold, Italic, Underline)
- test coverage

## Installation

```bash
npm install
```

## Usage

### Uncontrolled Mode

```tsx
import { WYSIWYGEditor } from './components/WYSIWYGEditor';

function App() {
  return <WYSIWYGEditor />;
}
```

### Controlled Mode

```tsx
import { useState } from 'react';
import { EditorState } from 'draft-js';
import { WYSIWYGEditor } from './components/WYSIWYGEditor';

function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (newState: SetStateAction<EditorState>) => {
    setControlledState(newState);
  };

  return (
    <div className="app-container">
      <h1 className="main-title">WYSIWYG Editor Demo</h1>
      
      <section className="editor-section">
        <h2 className="section-title">Controlled Editor</h2>
        <WYSIWYGEditor
          value={controlledState}
          onChange={handleEditorChange}
        />
      </section>

      <section className="editor-section">
        <h2 className="section-title">Uncontrolled Editor</h2>
        <WYSIWYGEditor />
      </section>
    </div>
  );
}
```

### Custom Toolbar USAGE ex.

```tsx
import { WYSIWYGEditor } from './components/WYSIWYGEditor';

function App() {
  const CustomToolbar = ({ editorState, onToggle, hasStyle }) => (
    <div>
      <button
        onClick={() => onToggle('BOLD')}
        style={{ fontWeight: hasStyle('BOLD') ? 'bold' : 'normal' }}
      >
        Custom Bold
      </button>
            {/*Any extra buttons should be here*/}
    </div>
  );

  return <WYSIWYGEditor renderToolbar={CustomToolbar} />;
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| value | EditorState | Editor content for controlled mode |
| onChange | (state: EditorState) => void | Change handler for controlled mode |
| className | string | Additional CSS classes |
| style | CSSProperties | Additional inline styles |
| renderToolbar | (props: ToolbarProps) => ReactNode | Custom toolbar renderer |
| placeholder | string | Placeholder text |

## Development

```bash
# Start development server
npm run dev

# Run tests
npm test
```

