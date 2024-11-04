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
        "flex cursor-pointer items-center justify-between p-2 py-1 hover:brightness-90",
        getFileStatusStyle(itemPath, commitFileList),
        selectedCommitFile.filename === itemPath && "bg-gray-300",
      )}
      style={{ paddingLeft: indentation }}
      onClick={onClick}
    >
      <span className="truncate">{itemPath.split("/").at(-1)}</span>
      <span className="mx-2 text-xs uppercase">
        {commitFileList.find((file) => file.filename === itemPath)?.status[0]}
      </span>
    </div>
  );
};
