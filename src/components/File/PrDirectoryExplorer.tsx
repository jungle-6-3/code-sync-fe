import { ChevronDown, ChevronRight, Folder } from "lucide-react";

interface PrDirectoryExplorerProps {
  indentation: number;
  toggleDirectoryExpansion: (directoryPath: string) => void;
  currentPath: string;
  isExpanded: boolean;
  childItems: string[];
}

export const PrDirectoryExplorer = ({
  indentation,
  toggleDirectoryExpansion,
  currentPath,
  childItems,
  isExpanded,
}: PrDirectoryExplorerProps) => {
  return (
    <div
      className="flex cursor-pointer items-center bg-white py-2 pl-2 hover:brightness-90"
      style={{ paddingLeft: indentation + "px" }}
      onClick={() => toggleDirectoryExpansion(currentPath)}
    >
      {childItems.length > 0 &&
        (isExpanded ? (
          <ChevronDown className="mr-1 h-4 w-4" />
        ) : (
          <ChevronRight className="mr-1 h-4 w-4" />
        ))}
      <Folder className="mr-2 h-4 w-4" />
      <span>{currentPath.split("/").pop()}</span>
    </div>
  );
};
