import { SetStateAction, useState } from 'react';
import { EditorState } from 'draft-js';
import { WYSIWYGEditor } from './components/Editor';
import './App.css';

function App() {
  const [controlledState, setControlledState] = useState(() =>
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

export default App;
