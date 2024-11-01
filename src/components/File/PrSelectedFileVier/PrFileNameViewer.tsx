import { fileSysyemStore } from "@/stores/github.store";
import { cn } from "../../../lib/utils";

interface PrFileNameViewerProps {
  fileName: string;
}

export const PrFileNameViewer = ({ fileName }: PrFileNameViewerProps) => {
  const selectedCommitFile = fileSysyemStore(
    (state) => state.selectedCommitFile,
  );
  const clickedFileList = fileSysyemStore((state) => state.clickedFileList);
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );
  const removeClickedFileList = fileSysyemStore(
    (state) => state.removeClickedFileList,
  );

  const onFileSelect = () => {
    const clickFile = clickedFileList.find(
      (file) => file.filename === fileName,
    );
    if (clickFile) {
      setSelectedCommitFile(clickFile);
    }
  };

  return (
    <div
      className={cn(
        "mx-1 flex",
        selectedCommitFile.filename === fileName &&
          "border-b-4 border-blue-500",
      )}
    >
      <span
        className={cn(
          "item m-1 flex h-7 w-fit items-center px-2 py-6",
          selectedCommitFile.filename === fileName && "text-pink-500",
        )}
        onClick={onFileSelect}
      >
        {fileName}
      </span>
      {selectedCommitFile.filename === fileName && (
        <button
          onClick={() => {
            removeClickedFileList(selectedCommitFile);
          }}
          className="mx-1"
        >
          x
        </button>
      )}
    </div>
  );
};
