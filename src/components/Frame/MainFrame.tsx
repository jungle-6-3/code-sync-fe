import { useEffect, useRef, useState } from "react";
import { fileSysyemStore } from "@/stores/github.store";
import { MonacoBinding } from "y-monaco";
import { editor } from "monaco-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FileTreeComponent from "@/components/File/PrFileExplorer";
import ConversationChatting from "@/components/Conversation/ConversationChatting";
import { PrFileNameViewer } from "@/components/File/PrSelectedFileViewer/PrFileNameViewer";
import { PrFilePathViewer } from "@/components/File/PrSelectedFileViewer/PrFilePathViewer";
import { PRBottomFileExplorer } from "@/components/File/PRBottomFileExplorer";
import { initFileStructSync, RemoteCursorIndicator } from "@/lib/yjs";
import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import {
  chattingMessageStore,
  chattingPreviewStore,
} from "@/stores/chattingMessage.store";
import { ChattingSocketResponse } from "@/apis/conversation/dtos";
import { sectionSelectStore } from "@/stores/chattingRoom.store";
import SelectedFileViewer from "@/components/File/SelectedFile";
import useCheckUserQuery from "@/hooks/Users/useCheckUserQuery";
import { Button } from "@/components/ui/button";
import { useConvertToImage } from "@/hooks/useConvertToImage";
import { SyncButton } from "@/components/Conversation/SyncButton";

export const MainFrame = () => {
  const leftSection = sectionSelectStore((state) => state.leftSection);
  const bottomSection = sectionSelectStore((state) => state.bottomSection);
  const selectedCommitFile = fileSysyemStore(
    (state) => state.selectedCommitFile,
  );
  const roomId = window.location.pathname.split("/")[1];
  const commitFileList = fileSysyemStore((state) => state.commitFileList);
  const clickedFileList = fileSysyemStore((state) => state.clickedFileList);
  const selectedTotalFilePath = selectedCommitFile.filename.split("/");
  const addMessage = chattingMessageStore((state) => state.addMessage);
  const addPreviewMessage = chattingPreviewStore((state) => state.addMessage);
  const initCommitFileList = fileSysyemStore(
    (state) => state.initCommitFileList,
  );
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const bindingRef = useRef<MonacoBinding | null>(null);
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );

  if (!roomId) throw new Error("roomId is required");
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");

  const ydoc = SocketManager.getInstance().yjsSocket.ydoc;
  const socket = SocketManager.getInstance().socketIOSocket;
  const provider = SocketManager.getInstance().yjsSocket.provider;
  const { checkUser } = useCheckUserQuery();
  const elementRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { convertToImage } = useConvertToImage({ elementRef, size });

  const otherUserSelectedCommitFile = fileSysyemStore(
    (state) => state.otherUserSelectedCommitFile,
  );
  const setOtherUserSelectedCommitFile = fileSysyemStore(
    (state) => state.setOtherUserSelectedCommitFile,
  );
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [selectedCommitFile]);

  const removeAllCursorStle = () => {
    const cursorStyles = document.querySelectorAll(
      '[class*="yRemoteSelectionHead-"]',
    );
    cursorStyles.forEach((style) => style.remove());
  };

  useEffect(() => {
    const onChatting = (msg: {
      name: string;
      message: string;
      email: string;
      date: string;
    }) => {
      addMessage(new ChattingSocketResponse(msg));
      addPreviewMessage(new ChattingSocketResponse(msg));
    };
    socket.on("chatting", onChatting);
    return () => {
      socket.off("chatting", onChatting);
    };
  }, [socket, addMessage, addPreviewMessage]);

  useEffect(() => {
    // sync 이벤트 핸들러 내부에서 파일 메타데이터 동기화
    initFileStructSync(ydoc, provider, commitFileList, initCommitFileList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, ydoc, roomId]);

  useEffect(() => {
    if (!provider || !checkUser?.data) return;
    removeAllCursorStle();
    provider.awareness.setLocalStateField("user", {
      name: checkUser.data.name,
      color: "#ff6161",
      colorLight: "#30bced33",
      cursor: {
        current_file_path: selectedCommitFile.filename,
      },
    });

    return () => {
      provider?.awareness.setLocalStateField("user", null);
    };
  }, [provider, checkUser?.data, selectedCommitFile]);

  useEffect(() => {
    if (!provider || !checkUser?.data) return;
    removeAllCursorStle();
    const handleAwarnessChange = () => {
      const statesArray = Array.from(provider.awareness.getStates());
      statesArray.forEach((state) => {
        const [clientId, clientState] = state;
        if (clientState?.user) {
          const styleSheet = document.createElement("style");
          styleSheet.innerText = RemoteCursorIndicator(
            clientId,
            clientState.user,
          );
          document.head.appendChild(styleSheet);
        }
      });

      const totalUserInfo = statesArray.filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, state]) => state?.user && Object.keys(state).length > 0,
      );

      if (totalUserInfo.length < 2) return;

      const myId = provider.awareness.clientID;
      const myInfo = totalUserInfo.find(([id]) => id === myId);
      const otherInfo = totalUserInfo.find(([id]) => id !== myId);
      if (!myInfo?.[1]?.user?.cursor || !otherInfo?.[1]?.user?.cursor) return;
      const otherUserCurrentCursor = otherInfo[1].user.cursor;
      if (
        otherUserSelectedCommitFile !== otherUserCurrentCursor.current_file_path
      )
        setOtherUserSelectedCommitFile(
          otherUserCurrentCursor.current_file_path,
        );
    };
    provider.awareness.on("change", handleAwarnessChange);
    return () => {
      removeAllCursorStle();
      provider.awareness.off("change", handleAwarnessChange);
    };
  }, [
    provider,
    editor,
    ydoc,
    checkUser?.data,
    selectedCommitFile.filename,
    otherUserSelectedCommitFile,
    setOtherUserSelectedCommitFile,
  ]);

  useEffect(() => {
    removeAllCursorStle();
  }, [selectedCommitFile.filename]);

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
    if (!editor || !selectedCommitFile || !provider) return;

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
      provider.awareness,
    );
    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
      }
    };
  }, [ydoc, editor, selectedCommitFile, provider]);

  const onEditorMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    setEditor(editorInstance);
  };

  const onDiffEditorMount = (diffEditor: editor.IStandaloneDiffEditor) => {
    const modifiedEditor = diffEditor.getModifiedEditor();
    setEditor(modifiedEditor);
  };

  return (
    <ResizablePanelGroup direction="horizontal" autoSave="main-frame">
      {leftSection !== "" && (
        <>
          <ResizablePanel defaultSize={20} order={1} className="min-w-[10rem]">
            {leftSection === "folder" ? (
              <FileTreeComponent />
            ) : (
              <ConversationChatting />
            )}
          </ResizablePanel>
          <ResizableHandle />
        </>
      )}
      <ResizablePanel defaultSize={80} order={2}>
        {selectedCommitFile.filename !== "" && (
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex w-full overflow-x-scroll border-b">
                {clickedFileList.map((file, index) => {
                  return (
                    <PrFileNameViewer key={index} fileName={file.filename} />
                  );
                })}
              </div>
            </div>
            <PrFilePathViewer filePaths={selectedTotalFilePath} />
            <div className="absolute right-0 top-9 z-[100]">
              <SyncButton />
              {(selectedCommitFile.status === "added" ||
                selectedCommitFile.status === "modified" ||
                selectedCommitFile.status === "removed") && (
                <Button
                  onClick={convertToImage}
                  className="fourth-step rounded-none border-b-2 border-blue-700 text-sm text-slate-800"
                  size="sm"
                  variant="ghost"
                >
                  코드 이미지로 추출
                </Button>
              )}
            </div>
          </div>
        )}
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel
            defaultSize={70}
            className="relative z-0 flex items-center justify-center"
          >
            <div
              ref={elementRef}
              className="flex h-full w-full items-center justify-center"
            >
              {selectedCommitFile && (
                <SelectedFileViewer
                  status={selectedCommitFile.status}
                  selectedCommitFile={selectedCommitFile}
                  commitFileList={commitFileList}
                  onEditorMount={onEditorMount}
                  onSplitEditorMount={onDiffEditorMount}
                />
              )}
            </div>
          </ResizablePanel>
          {bottomSection !== "" && (
            <>
              <ResizableHandle />
              <ResizablePanel defaultSize={30} className="min-h-[4rem]">
                <PRBottomFileExplorer />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
