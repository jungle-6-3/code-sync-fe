import { useState } from "react";
import { ChevronRight, ChevronDown, FileText, Folder } from "lucide-react";
import { fileSysyemStore } from "@/stores/github.store";

const PrFileExplorer = () => {
  const { commitFileList, selectedCommitFile, setSelectedCommitFile } =
    fileSysyemStore();
  const [expandedPaths, setExpandedPaths] = useState<string[]>([]);

  const getAllDirectoryPaths = () => {
    const directoryPaths = new Set<string>();

    commitFileList.forEach((file) => {
      const pathSegments = file.filename.split("/");
      let currentPath = "";

      pathSegments.slice(0, -1).forEach((segment) => {
        currentPath = currentPath ? `${currentPath}/${segment}` : segment;
        directoryPaths.add(currentPath);
      });
    });

    return Array.from(directoryPaths);
  };

  const getRootItems = () => {
    const allPaths = [
      ...commitFileList.map((file) => file.filename),
      ...getAllDirectoryPaths(),
    ];

    const rootItems = allPaths
      .filter((itemPath) => !itemPath.includes("/"))
      .concat(
        allPaths
          .filter((itemPath) => itemPath.includes("/"))
          .map((itemPath) => itemPath.split("/")[0]),
      )
      .filter((item, index, self) => self.indexOf(item) === index);

    // 폴더와 파일을 분리하고 정렬
    const folders = rootItems.filter((item) =>
      getAllDirectoryPaths().some((dir) => dir.startsWith(item)),
    );
    const files = rootItems.filter((item) => !folders.includes(item));

    // 폴더를 먼저, 그 다음 파일을 반환
    return [...folders.sort(), ...files.sort()];
  };

  const getDirectoryContents = (currentPath: string) => {
    const allPaths = [
      ...commitFileList.map((file) => file.filename),
      ...getAllDirectoryPaths(),
    ];

    const items = allPaths.filter((itemPath) => {
      const itemSegments = itemPath.split("/");
      const parentSegments = currentPath ? currentPath.split("/") : [];
      return (
        itemPath.startsWith(currentPath ? currentPath + "/" : "") &&
        itemSegments.length === parentSegments.length + 1
      );
    });

    // 폴더와 파일을 분리하고 정렬
    const folders = items.filter((item) =>
      getAllDirectoryPaths().some((dir) => dir.startsWith(item)),
    );
    const files = items.filter((item) => !folders.includes(item));

    // 폴더를 먼저, 그 다음 파일을 반환
    return [...folders.sort(), ...files.sort()];
  };

  const toggleDirectoryExpansion = (directoryPath: string) => {
    setExpandedPaths((currentPaths) =>
      currentPaths.includes(directoryPath)
        ? currentPaths.filter((path) => path !== directoryPath)
        : [...currentPaths, directoryPath],
    );
  };

  const handleFileSelection = (filePath: string) => {
    const fileInfo = commitFileList.find((file) => file.filename === filePath);
    if (fileInfo) {
      setSelectedCommitFile(fileInfo);
    }
  };

  const getFileStatusStyle = (filePath: string) => {
    const fileInfo = commitFileList.find((file) => file.filename === filePath);
    switch (fileInfo?.status) {
      case "added":
        return "bg-green-100";
      case "modified":
        return "bg-yellow-100";
      case "removed":
        return "bg-red-100";
      default:
        return "";
    }
  };

  const renderTreeNode = (currentPath: string = "", depth: number = 0) => {
    const childItems =
      currentPath === "" ? getRootItems() : getDirectoryContents(currentPath);
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
                  } ${getFileStatusStyle(itemPath)}`}
                  style={{ paddingLeft: indentation + 8 + "px" }}
                  onClick={() => handleFileSelection(itemPath)}
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
                  } ${getFileStatusStyle(itemPath)}`}
                  style={{ paddingLeft: indentation + 24 + "px" }}
                  onClick={() => handleFileSelection(itemPath)}
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
      <div className="p-2">{renderTreeNode()}</div>
    </div>
  );
};

export default PrFileExplorer;
