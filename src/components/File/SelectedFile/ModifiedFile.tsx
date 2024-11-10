import { CodeSplitEditor } from "@/components/CodeEditor";
import { Suspense, useContext } from "react";
import { FileEditorProps } from "./file";
import { BoardContext } from ".";
import { Button } from "@/components/ui/button";

export const ModifiedFile = ({
  selectedCommitFile,
  onSplitEditorMount,
}: FileEditorProps) => {
  const { convertToImage } = useContext(BoardContext);
  return (
    <>
      <Button
        onClick={convertToImage}
        className="absolute top-20 z-20 py-0 text-sm"
        variant="ghost"
      >
        Editor snapshot
      </Button>
      <Suspense>
        <CodeSplitEditor
          language={selectedCommitFile.language}
          originalValue={selectedCommitFile.beforeContent}
          modifiedValue={selectedCommitFile.afterContent}
          onSplitEditorMount={onSplitEditorMount}
        />
      </Suspense>
    </>
  );
};
