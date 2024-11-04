import { CodeEditor } from "@/components/CodeEditor";
import { FileEditorProps } from "./file";

export const AddedFile = ({
  selectedCommitFile,
  onEditorMount,
}: FileEditorProps) => {
  return (
    <CodeEditor
      language={selectedCommitFile.language}
      initialValue={selectedCommitFile.afterContent}
      onEditorMount={onEditorMount}
    />
  );
};
