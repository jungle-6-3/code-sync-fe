import Editor from "@monaco-editor/react";
import { type Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface CodeEditorProps {
  language: string;
  initialValue: string;
  onEditorMount?: (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => void;
}

const CodeEditor = ({
  language,
  initialValue,
  onEditorMount,
}: CodeEditorProps) => {
  const handleEditorMount = (
    eidtor: editor.IStandaloneCodeEditor,
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
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={initialValue}
      onMount={handleEditorMount}
    />
  );
};

export default CodeEditor;

// TODO: splitEditor와 editor를 합치기 고민하기
