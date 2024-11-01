import { getFileStatusStyle } from "@/lib/file";
import { cn } from "@/lib/utils";
import { fileSysyemStore } from "@/stores/github.store";

interface PrFileExplorerItemProps {
  itemPath: string;
  indentation: string;
  onClick: () => void;
}

export const PrFileExplororItem = ({
  itemPath,
  indentation,
  onClick,
}: PrFileExplorerItemProps) => {
  const commitFileList = fileSysyemStore((state) => state.commitFileList);
  const selectedCommitFile = fileSysyemStore(
    (status) => status.selectedCommitFile,
  );

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center p-2 hover:brightness-90",
        getFileStatusStyle(itemPath, commitFileList),
        selectedCommitFile.filename === itemPath && "bg-blue-300",
      )}
      style={{ paddingLeft: indentation }}
      onClick={onClick}
    >
      <span>{itemPath.split("/").at(-1)}</span>
      <span className="ml-2 text-xs text-gray-500">
        {commitFileList.find((file) => file.filename === itemPath)?.status}
      </span>
    </div>
  );
};
