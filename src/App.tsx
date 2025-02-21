import { useState } from 'react';
import { EditorState } from 'draft-js';
import { WYSIWYGEditor } from './components/Editor';
import './App.css';

function App() {
  const [controlledState, setControlledState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="app-container">
      <h1 className="main-title">WYSIWYG Editor Demo</h1>
      
      <section className="editor-section">
        <h2 className="section-title">Controlled Editor</h2>
        <WYSIWYGEditor
          value={controlledState}
          onChange={setControlledState}
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
