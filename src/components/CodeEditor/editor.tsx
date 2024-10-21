import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
}

const CodeEditor = ({ initialValue }: CodeEditorProps) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={initialValue}
    />
  );
};

export default CodeEditor;
