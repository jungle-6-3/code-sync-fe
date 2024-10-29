import { useState } from "react";
import { ChevronRight, ChevronDown, FileText, Folder } from "lucide-react";
import { fileSysyemStore, PrChangedFileInfo } from "@/stores/github.store";
import {
  getDirectoryContents,
  getFileStatusStyle,
  getRootItems,
} from "@/lib/file";

const PrFileExplorer = () => {
  const { commitFileList, selectedCommitFile, setSelectedCommitFile } =
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
    if (fileInfo) {
      setSelectedCommitFile(fileInfo);
    }
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
                <div
                  key={itemPath}
                  className={`flex cursor-pointer items-center p-2 hover:bg-gray-50 ${
                    selectedCommitFile.filename === itemPath ? "bg-blue-50" : ""
                  } ${getFileStatusStyle(itemPath, commitFileList)}`}
                  style={{ paddingLeft: indentation + 8 + "px" }}
                  onClick={() => handleFileSelection(itemPath, commitFileList)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{itemPath}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    {
                      commitFileList.find((file) => file.filename === itemPath)
                        ?.status
                    }
                  </span>
                </div>
              );
            }

            return renderTreeNode(itemPath, depth);
          })}
        </div>
      );
    }

    return (
      <div key={currentPath}>
        <div
          className="flex cursor-pointer items-center p-2 hover:bg-gray-100"
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

        {isExpanded &&
          childItems.map((itemPath) => {
            const isFile = commitFileList.some(
              (file) => file.filename === itemPath,
            );

            if (isFile) {
              return (
                <div
                  key={itemPath}
                  className={`flex cursor-pointer items-center p-2 hover:bg-gray-50 ${
                    selectedCommitFile.filename === itemPath ? "bg-blue-50" : ""
                  } ${getFileStatusStyle(itemPath, commitFileList)}`}
                  style={{ paddingLeft: indentation + 24 + "px" }}
                  onClick={() => handleFileSelection(itemPath, commitFileList)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{itemPath.split("/").pop()}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    {
                      commitFileList.find((file) => file.filename === itemPath)
                        ?.status
                    }
                  </span>
                </div>
              );
            }

            return renderTreeNode(itemPath, depth + 1);
          })}
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="border-b bg-gray-50 p-3">
        <h3 className="text-sm font-medium">Changed Files</h3>
      </div>
      <div className="p-2">{renderTreeNode("src")}</div>
    </div>
  );
};

export default PrFileExplorer;
