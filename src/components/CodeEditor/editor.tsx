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
      onMount={(_, monaco) => {
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: true, // This line disables errors in jsx tags like <div>, etc.
        });
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          // jsx: 'react',
          jsx: monaco.languages.typescript.JsxEmit.React,
          jsxFactory: "React.createElement",
          reactNamespace: "React",
          allowNonTsExtensions: true,
          allowJs: true,
          target: monaco.languages.typescript.ScriptTarget.Latest,
        });
      }}
    />
  );
};

export default CodeEditor;
