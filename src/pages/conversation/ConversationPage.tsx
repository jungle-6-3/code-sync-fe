import { CodeEditor, CodeSplitEditor } from "@/components/CodeEditor";
import FileTreeComponent from "@/components/File/PrFileExplorer";
import { LeftGNB, TopGNB } from "@/components/GNB";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  fileSysyemStore,
  PrChangedFileInfo,
  prInfoStore,
} from "@/stores/github.store";
import { useEffect, useMemo, useRef, useState } from "react";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import { editor } from "monaco-editor";
import { socketStore } from "@/stores/socket.store";
import { useJoinRequestByToast, useUserDisconnectedToast } from "@/hooks/Toast";
import { SocketJoinRequestBy } from "@/hooks/Toast/useJoinReqeustBy";
import { SocketUserDisconnected } from "@/hooks/Toast/useUserDisconnected";

const ConversationPage = () => {
  const { prInfo } = prInfoStore();
  const { selectedCommitFile, commitFileList } = fileSysyemStore();
  const roomId = window.location.pathname.split("/")[1];

  const socket = socketStore((state) => state.socket);
  const { onToast: onJoinRequestByToast } = useJoinRequestByToast();
  const { onToast: onUserDisconnectedToast } = useUserDisconnectedToast();

  const ydoc = useMemo(() => new Y.Doc(), []);
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const providerRef = useRef<WebsocketProvider | null>(null);
  const bindingRef = useRef<MonacoBinding | null>(null);
  const fileMetadata = ydoc.getArray<PrChangedFileInfo>("fileMetadata");

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

  // Provider 초기화
  useEffect(() => {
    if (!providerRef.current) {
      providerRef.current = new WebsocketProvider(
        "wss://demos.yjs.dev/ws",
        roomId,
        ydoc,
        {
          connect: true,
          maxBackoffTime: 2500,
        },
      );
    }

    // sync 이벤트 핸들러 내부
    providerRef.current.on("sync", (isSynced: boolean) => {
      if (isSynced) {
        // 방장인 경우: 파일 메타데이터 공유
        if (commitFileList?.length && fileMetadata.length === 0) {
          // 기존 배열을 비우고
          fileMetadata.delete(0, fileMetadata.length);

          // 각 파일의 메타데이터를 개별적으로 push
          commitFileList.forEach((file) => {
            fileMetadata.push([
              {
                filename: file.filename,
                language: file.language || "plaintext",
                status: file.status,
                additions: file.additions || 0,
                deletions: file.deletions || 0,
                afterContent: file.afterContent || "",
                beforeContent: file.beforeContent || "",
              },
            ]);
          });
        } else if (commitFileList.length === 0 && fileMetadata.length > 0) {
          const files = fileMetadata
            .toArray()
            .map((metadata: PrChangedFileInfo) => ({
              filename: metadata.filename,
              language: metadata.language,
              status: metadata.status,
              beforeContent: metadata.beforeContent,
              afterContent: metadata.afterContent,
              additions: metadata.additions,
              deletions: metadata.deletions,
            }));

          fileSysyemStore.setState({ commitFileList: files });
          fileSysyemStore.setState({ selectedCommitFile: files[0] });
        }
      }
    });

    return () => {
      if (providerRef.current) {
        providerRef.current.destroy();
        providerRef.current = null;
      }
    };
  }, [ydoc, roomId]);

  // 파일 내용 초기화
  useEffect(() => {
    if (!commitFileList || commitFileList.length === 0) return;

    commitFileList.forEach((file) => {
      const ytext = ydoc.getText(`${file.filename}`);
      if (ytext.length === 0) {
        ytext.delete(0, ytext.length);
        ytext.insert(0, file.afterContent);
      }
    });
  }, [commitFileList, ydoc]);

  // 에디터 바인딩
  useEffect(() => {
    if (!providerRef.current || !editor || !selectedCommitFile) return;

    // 이전 바인딩 정리
    if (bindingRef.current) {
      bindingRef.current.destroy();
      bindingRef.current = null;
    }

    const model = editor.getModel();
    if (!model) return;

    const ytext = ydoc.getText(selectedCommitFile.filename);
    bindingRef.current = new MonacoBinding(
      ytext,
      model,
      new Set([editor]),
      providerRef.current.awareness,
    );

    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
      }
    };
  }, [ydoc, editor, selectedCommitFile]);

  const handleEditorMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    setEditor(editorInstance);
  };

  const handleDiffEditorMount = (diffEditor: editor.IStandaloneDiffEditor) => {
    const modifiedEditor = diffEditor.getModifiedEditor();
    setEditor(modifiedEditor);
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
            <FileTreeComponent />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                {selectedCommitFile &&
                  (selectedCommitFile.status === "removed" ? (
                    <div>diff load</div>
                  ) : selectedCommitFile.status === "added" ? (
                    <CodeEditor
                      language={selectedCommitFile.language}
                      initialValue={selectedCommitFile.afterContent}
                      onEditorMount={handleEditorMount}
                    />
                  ) : (
                    <CodeSplitEditor
                      language={selectedCommitFile.language}
                      originalValue={selectedCommitFile.beforeContent}
                      modifiedValue={selectedCommitFile.afterContent}
                      onEditorMount={handleDiffEditorMount}
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
