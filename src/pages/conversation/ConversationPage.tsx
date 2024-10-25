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

const ConversationPage = () => {
  const { prInfo } = prInfoStore();
  const { selectedFile } = fileSysyemStore();
  const socket = socketStore((state) => state.socket);
  const { onToast: onJoinRequestByToast } = useJoinRequestByToast();
  const { onToast: onUserDisconnectedToast } = useUserDisconnectedToast();

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
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                {selectedFile &&
                  (selectedFile.status === "removed" ? (
                    <div>diff load</div>
                  ) : selectedFile.status === "added" ? (
                    <CodeEditor
                      language={selectedFile.language}
                      initialValue={selectedFile.afterContent}
                    />
                  ) : (
                    <CodeSplitEditor
                      language={selectedFile.language}
                      originalValue={selectedFile.beforeContent}
                      modifiedValue={selectedFile.afterContent}
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
