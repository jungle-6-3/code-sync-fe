import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  initialValue: string;
}

const CodeEditor = ({ language, initialValue }: CodeEditorProps) => {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
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

// TODO: splitEditor와 editor를 합치기 고민하기
