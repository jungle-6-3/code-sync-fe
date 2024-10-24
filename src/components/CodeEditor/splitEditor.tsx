import { DiffEditor } from "@monaco-editor/react";

interface CodeSplitEditorProps {
  language: string;
  originalValue: string;
  modifiedValue: string;
}

const CodeSplitEditor = ({
  language,
  originalValue,
  modifiedValue,
}: CodeSplitEditorProps) => {
  return (
    <DiffEditor
      language={language}
      original={originalValue}
      modified={modifiedValue}
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

export default CodeSplitEditor;
