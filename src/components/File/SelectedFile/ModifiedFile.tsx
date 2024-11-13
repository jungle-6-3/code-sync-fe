import { CodeSplitEditor } from "@/components/CodeEditor";
import { FileEditorProps } from "./file";

export const ModifiedFile = ({
  selectedCommitFile,
  onSplitEditorMount,
}: FileEditorProps) => {
  return (
    <>
      <CodeSplitEditor
        language={selectedCommitFile.language}
        originalValue={selectedCommitFile.beforeContent}
        modifiedValue={selectedCommitFile.afterContent}
        onSplitEditorMount={onSplitEditorMount}
      />
    </>
  );
};
