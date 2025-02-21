const EditorState = {
  createEmpty: jest.fn(() => ({
    getCurrentInlineStyle: jest.fn(() => ({
      has: jest.fn(() => false), 
    })),
    getSelection: jest.fn(() => ({
      getHasFocus: jest.fn(() => false),
    })),
    getCurrentContent: jest.fn(() => ({
      getBlockMap: jest.fn(() => new Map()),
    })),
  })),
};

const RichUtils = {
  toggleInlineStyle: jest.fn((editorState, style) => editorState), 
  handleKeyCommand: jest.fn((editorState, command) => editorState), 
};

const Editor = jest.fn((props) => {
  const div = document.createElement("div");
  div.className = "DraftEditor-root";
  return div;
});

module.exports = {
  EditorState,
  RichUtils,
  Editor,
};
