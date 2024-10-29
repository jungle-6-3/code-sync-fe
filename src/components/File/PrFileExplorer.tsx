import { useState } from "react";
import { fileSysyemStore, PrChangedFileInfo } from "@/stores/github.store";
import { getDirectoryContents, getRootItems } from "@/lib/file";
import { PrFileExplororItem } from "./PrFileExplorerItem";
import { PrDirectoryExplorer } from "./PrDirectoryExplorer";

const PrFileExplorer = () => {
  const { commitFileList, setSelectedCommitFile } = fileSysyemStore();
  const [expandedPaths, setExpandedPaths] = useState([""]);

  const toggleDirectoryExpansion = (directoryPath: string) => {
    setExpandedPaths((currentPaths) =>
      currentPaths.includes(directoryPath)
        ? currentPaths.filter((path) => path !== directoryPath)
        : [...currentPaths, directoryPath],
    );
  };

  const handleFileSelection = (
    filePath: string,
    fileList: PrChangedFileInfo[],
  ) => {
    const fileInfo = fileList.find((file) => file.filename === filePath);
    if (fileInfo) setSelectedCommitFile(fileInfo);
  };

  const renderTreeNode = (currentPath: string = "", depth: number = 0) => {
    const childItems =
      currentPath === ""
        ? getRootItems(commitFileList)
        : getDirectoryContents(currentPath, commitFileList);
    const isExpanded = expandedPaths.includes(currentPath);
    const indentation = depth * 20;

    if (currentPath === "") {
      return (
        <div>
          {childItems.map((itemPath) => {
            const isFile = commitFileList.some(
              (file) => file.filename === itemPath,
            );

            if (isFile) {
              return (
                <PrFileExplororItem
                  key={itemPath}
                  indentation={indentation + 8 + "px"}
                  itemPath={itemPath}
                  onClick={() => handleFileSelection(itemPath, commitFileList)}
                />
              );
            }

            return renderTreeNode(itemPath, depth);
          })}
        </div>
      );
    }
    //directory
    return (
      <div key={currentPath}>
        <PrDirectoryExplorer
          indentation={indentation}
          onToggle={() => toggleDirectoryExpansion(currentPath)}
          currentPath={currentPath}
          childItems={childItems}
          isExpanded={isExpanded}
        />

        {isExpanded &&
          childItems.map((itemPath) => {
            const isFile = commitFileList.some(
              (file) => file.filename === itemPath,
            );

            if (isFile) {
              return (
                <PrFileExplororItem
                  key={itemPath}
                  indentation={indentation + 24 + "px"}
                  itemPath={itemPath}
                  onClick={() => handleFileSelection(itemPath, commitFileList)}
                />
              );
            }

            return renderTreeNode(itemPath, depth + 1);
          })}
      </div>
    );
  };

  return (
    <div className="overflow-hidden">
      <div className="border-b bg-gray-50 py-3 pl-3">
        <h3 className="text-sm font-medium">Changed Files</h3>
      </div>
      {renderTreeNode("src")}
    </div>
  );
};

export default PrFileExplorer;
