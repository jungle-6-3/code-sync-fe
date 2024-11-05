import { CodeSplitEditor } from "@/components/CodeEditor";
import { useContext } from "react";
import { FileEditorProps } from "./file";
import { BoardContext } from ".";

export const ModifiedFile = ({
  selectedCommitFile,
  onSplitEditorMount,
}: FileEditorProps) => {
  const { convertToImage } = useContext(BoardContext);
  return (
    <>
      <button onClick={convertToImage} className="p-2 text-pink-500">
        보여줘 하츄핑!!!!
      </button>
      <CodeSplitEditor
        language={selectedCommitFile.language}
        originalValue={selectedCommitFile.beforeContent}
        modifiedValue={selectedCommitFile.afterContent}
        onSplitEditorMount={onSplitEditorMount}
      />
    </>
  );
};
