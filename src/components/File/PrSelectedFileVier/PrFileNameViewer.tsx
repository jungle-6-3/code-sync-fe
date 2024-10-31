import { fileSysyemStore } from "@/stores/github.store";
import { cn } from "../../../lib/utils";

interface PrFileNameViewerProps {
  fileName: string;
}

export const PrFileNameViewer = ({ fileName }: PrFileNameViewerProps) => {
  const selectedCommitFile = fileSysyemStore(
    (state) => state.selectedCommitFile,
  );

  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );
  const removeClickedFileList = fileSysyemStore(
    (state) => state.removeClickedFileList,
  );

  const clickedFileList = fileSysyemStore((state) => state.clickedFileList);

  const onFileSelect = () => {
    const clickFile = clickedFileList.find(
      (file) => file.filename === fileName,
    );
    if (clickFile) {
      setSelectedCommitFile(clickFile);
    }
  };
  return (
    <div className="flex">
      <span
        className={cn(
          "item m-1 flex h-7 w-fit items-center px-2 py-6",
          selectedCommitFile.filename === fileName &&
            "border-b-4 border-blue-500 text-pink-500",
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
        >
          x
        </button>
      )}
    </div>
  );
};
