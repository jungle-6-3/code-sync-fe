import { DiffEditor } from "@monaco-editor/react";

interface CodeSplitEditorProps {
  originalValue: string;
  modifiedValue: string;
}

const CodeSplitEditor = ({
  originalValue,
  modifiedValue,
}: CodeSplitEditorProps) => {
  return (
    <>
      <DiffEditor
        height="1000px"
        original={originalValue}
        modified={modifiedValue}
        originalLanguage="typescript"
        modifiedLanguage="typescript"
      />
    </>
  );
};

export default CodeSplitEditor;
