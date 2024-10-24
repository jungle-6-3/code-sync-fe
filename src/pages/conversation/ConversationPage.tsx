import { CodeSplitEditor } from "@/components/CodeEditor";
import { LeftGNB, TopGNB } from "@/components/GNB";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import socket from "@/lib/socket";
import { PrChangedFileInfo, prInfoStore } from "@/stores/github";
import { useEffect } from "react";

const ConversationPage = () => {
  const {
    prInfo,
    selectedFile,
    prChangedFileList,
    setSelectedFile,
  } = prInfoStore();

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const fileOnclick = (selectedFile: PrChangedFileInfo) => {
    setSelectedFile(selectedFile);
  };

  return (
    <div className="flex h-screen flex-col">
      <nav className="border-b p-1">
        <TopGNB />
      </nav>
      <div className="flex h-full">
        <nav className="border-r">
          <LeftGNB />
        </nav>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20}>
            <div className="p-4">
              <h2 className="text-lg font-semibold">Changed Files</h2>
              <ul className="mt-2">
                {prChangedFileList.map((file, index) => (
                  <li
                    key={index}
                    className="py-1 text-sm"
                    onClick={() => {
                      fileOnclick(file);
                    }}
                  >
                    {file.filename}
                  </li>
                ))}
              </ul>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                {selectedFile && (
                  <CodeSplitEditor
                    originalValue={selectedFile.beforeContent}
                    modifiedValue={selectedFile.afterContent}
                    language={selectedFile.language}
                  />
                )}
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                <div className="p-4">
                  <h3 className="font-medium">Commit Information</h3>
                  <p className="mt-2 text-sm">
                    Branch: {prInfo.requireUserInfo.branchName} →{" "}
                    {prInfo.requestUserInfo.branchName}
                  </p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="bg-blue-400 p-1">bottom status</div>
    </div>
  );
};

export default ConversationPage;
