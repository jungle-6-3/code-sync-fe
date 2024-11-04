import { CodeEditor } from "@/components/CodeEditor";
import { FileEditorProps } from "./file";
import { useContext } from "react";
import { BoardContext } from "./";

export const AddedFile = ({
  selectedCommitFile,
  onEditorMount,
}: FileEditorProps) => {
  const { convertToImage } = useContext(BoardContext);
  return (
    <>
      <button onClick={convertToImage}>html to image</button>
      <CodeEditor
        language={selectedCommitFile.language}
        initialValue={selectedCommitFile.afterContent}
        onEditorMount={onEditorMount}
      />
    </>
  );
};
