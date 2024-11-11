import { useContext } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { BoardContext } from "@/components/File/SelectedFile/index";
import { FileEditorProps } from "./file";

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
