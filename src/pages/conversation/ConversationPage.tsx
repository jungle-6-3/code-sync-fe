import { CodeEditor, CodeSplitEditor } from "@/components/CodeEditor";
import FileTreeComponent from "@/components/File/PrFileExplorer";
import { LeftGNB, TopGNB } from "@/components/GNB";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useJoinRequestByToast, {
  SocketJoinRequestBy,
} from "@/hooks/Toast/useJoinReqeustBy";
import useUserDisconnectedToast, {
  SocketUserDisconnected,
} from "@/hooks/Toast/useUserDisconnected";
import { fileSysyemStore, prInfoStore } from "@/stores/github.store";
import { socketStore } from "@/stores/socket.store";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const ConversationPage = () => {
  const { prInfo } = prInfoStore();
  const { selectedCommitFile, commitFileList } = fileSysyemStore();
  const socket = socketStore((state) => state.socket);
  const { onToast: onJoinRequestByToast } = useJoinRequestByToast();
  const { onToast: onUserDisconnectedToast } = useUserDisconnectedToast();
  const selectedFileName = selectedCommitFile.filename.split("/").at(-1);
  const selectedTotalFilePath = selectedCommitFile.filename
    .split("/")
    .join(" > ");

  useEffect(() => {
    if (!socket) return;

    socket.on("join-request-by", ({ data, message }: SocketJoinRequestBy) => {
      onJoinRequestByToast({ data, message });
    });
    socket.on("user-disconnected", (data: SocketUserDisconnected) => {
      onUserDisconnectedToast(data);
    });

    return () => {
      // socket.disconnect();
      socket.off("join-request-by");
      socket.off("user-disconnected");
    };
  }, [socket, onJoinRequestByToast, onUserDisconnectedToast]);

  useEffect(() => {
    console.log(commitFileList);
  }, []);

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
            <FileTreeComponent />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <div>
              <span className="item m-1 flex h-7 w-fit items-center border-b-4 border-blue-500 px-2 py-5">
                {selectedFileName}
              </span>
              <span className="item border-b- m-1 flex h-4 w-full items-center p-2">
                {selectedTotalFilePath}
              </span>
            </div>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel
                defaultSize={70}
                className="flex items-center justify-center"
              >
                {selectedCommitFile &&
                  (selectedCommitFile.status === "removed" ? (
                    <Alert className="w-10/12 p-5">
                      <Terminal className="h-4 w-4" />
                      <AlertTitle className="text-2xl">Removed File</AlertTitle>
                      <AlertDescription className="text-xl">
                        File Removed.
                      </AlertDescription>
                    </Alert>
                  ) : selectedCommitFile.status === "renamed" ? (
                    <Alert className="w-10/12 p-5">
                      <Terminal className="h-4 w-4" />
                      <AlertTitle className="text-2xl">Renamed File</AlertTitle>
                      <AlertDescription className="text-xl">
                        File renamed without changes.
                      </AlertDescription>
                    </Alert>
                  ) : selectedCommitFile.status === "added" ? (
                    <CodeEditor
                      language={selectedCommitFile.language}
                      initialValue={selectedCommitFile.afterContent}
                    />
                  ) : (
                    <CodeSplitEditor
                      language={selectedCommitFile.language}
                      originalValue={selectedCommitFile.beforeContent}
                      modifiedValue={selectedCommitFile.afterContent}
                    />
                  ))}
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
