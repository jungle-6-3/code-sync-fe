import { useEffect, useState } from "react";
import { fileSysyemStore, PrChangedFileInfo } from "@/stores/github.store";
import { PrFileExplororItem } from "@/components/File/PrFileExplorerItem";
import { PrDirectoryExplorer } from "@/components/File/PrDirectoryExplorer";
import { getDirectoryContents, getRootItems } from "@/lib/file";

const PrFileExplorer = () => {
  const { commitFileList, setSelectedCommitFile, selectedCommitFile } =
    fileSysyemStore();
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

  useEffect(() => {
    if (selectedCommitFile?.filename) {
      const paths = selectedCommitFile.filename.split("/");
      let currentPath = "";
      const newPaths = paths.slice(0, -1).map((path) => {
        currentPath = currentPath ? `${currentPath}/${path}` : path;
        return currentPath;
      });

      setExpandedPaths((prev) => [...new Set([...prev, ...newPaths])]);
    }
  }, [selectedCommitFile]);

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

            if (!isFile) {
              return renderTreeNode(itemPath, depth);
            }

            return (
              <PrFileExplororItem
                key={itemPath}
                indentation={indentation + 8 + "px"}
                itemPath={itemPath}
                onClick={() => handleFileSelection(itemPath, commitFileList)}
              />
            );
          })}
        </div>
      );
    }

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

            if (!isFile) {
              return renderTreeNode(itemPath, depth + 1);
            }

            return (
              <PrFileExplororItem
                key={itemPath}
                indentation={indentation + 24 + "px"}
                itemPath={itemPath}
                onClick={() => handleFileSelection(itemPath, commitFileList)}
              />
            );
          })}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full border-b bg-gray-50 py-3 pl-3">
        <h3 className="text-sm font-medium">Changed Files</h3>
      </div>
      <div className="h-[calc(100vh-7.5rem)] overflow-auto text-sm">
        {renderTreeNode()}
      </div>
    </div>
  );
};

export default PrFileExplorer;
