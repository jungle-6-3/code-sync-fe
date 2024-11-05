import { ChevronDown, ChevronRight, Folder } from "lucide-react";

interface PrDirectoryExplorerProps {
  indentation: number;
  onToggle: () => void;
  currentPath: string;
  isExpanded: boolean;
  childItems: string[];
}

export const PrDirectoryExplorer = ({
  indentation,
  onToggle,
  currentPath,
  childItems,
  isExpanded,
}: PrDirectoryExplorerProps) => {
  return (
    <div
      className="flex cursor-pointer items-center bg-white py-1 pl-2 hover:brightness-90"
      style={{ paddingLeft: indentation + "px" }}
      onClick={onToggle}
    >
      {childItems.length > 0 &&
        (isExpanded ? (
          <ChevronDown className="mr-1 aspect-square flex-[0_0_1rem]" />
        ) : (
          <ChevronRight className="mr-1 aspect-square flex-[0_0_1rem]" />
        ))}
      <Folder className="mr-2 aspect-square h-4 w-4 flex-[0_0_0.75rem]" />
      <span className="truncate">{currentPath.split("/").pop()}</span>
    </div>
  );
};
