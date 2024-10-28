import { DiffEditor } from "@monaco-editor/react";
import { type Monaco, DiffOnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
interface CodeSplitEditorProps {
  language: string;
  originalValue: string;
  modifiedValue: string;
  onEditorMount?: (
    editor: editor.IStandaloneDiffEditor,
    monaco: Monaco,
  ) => void;
}

const CodeSplitEditor = ({
  language,
  originalValue,
  modifiedValue,
  onEditorMount,
}: CodeSplitEditorProps) => {
  const handleEditorMount = (
    eidtor: editor.IStandaloneDiffEditor,
    monaco: Monaco,
  ) => {
    if (onEditorMount) {
      onEditorMount(eidtor, monaco);
    }
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxFactory: "React.createElement",
      reactNamespace: "React",
      allowNonTsExtensions: true,
      allowJs: true,
      target: monaco.languages.typescript.ScriptTarget.Latest,
    });
  };

  return (
    <DiffEditor
      language={language}
      original={originalValue}
      modified={modifiedValue}
      onMount={handleEditorMount}
    />
  );
};

export default CodeSplitEditor;
