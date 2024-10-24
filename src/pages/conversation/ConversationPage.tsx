import { CodeSplitEditor } from "@/components/CodeEditor";
import { LeftGNB, TopGNB } from "@/components/GNB";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import socket from "@/lib/socket";
import { prInfoStore } from "@/stores/github";
import { useEffect } from "react";
// https://github.com/jungle-6-3/code-sync-fe/pull/12
const owner = "jungle-6-3";
const repo = "code-sync-fe";
const prNumber = 12;

const ConversationPage = () => {
  const { prInfo, prChangedFileList, setPrChangedFileList } = prInfoStore();

  useEffect(() => {
    setPrChangedFileList(owner, repo, prNumber);
    return () => {
      // cjonnecting when conversation page is mounted
      socket.disconnect();
    };
  }, [setPrChangedFileList]);

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
                  <li key={index} className="py-1 text-sm">
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
                {prChangedFileList.map((file, _) => {
                  return (
                    <CodeSplitEditor
                      originalValue={file.beforeContent}
                      modifiedValue={file.afterContent}
                      key={_}
                    />
                  );
                })}
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
