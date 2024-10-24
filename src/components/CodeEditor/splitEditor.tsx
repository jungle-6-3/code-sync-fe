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
    <>
      <DiffEditor
        height="150px"
        language={language}
        original={originalValue}
        modified={modifiedValue}
      />
    </>
  );
};

export default CodeSplitEditor;
