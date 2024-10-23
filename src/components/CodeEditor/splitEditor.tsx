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
        height="100px"
        original={originalValue}
        modified={modifiedValue}
        originalLanguage="javascript"
        modifiedLanguage="type"
      />
    </>
  );
};

export default CodeSplitEditor;
