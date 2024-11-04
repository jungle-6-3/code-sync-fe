import { useEffect, useRef, useState } from "react";
import { fileSysyemStore } from "@/stores/github.store";
import chattingRoomStore from "@/stores/chattingRoom.store";
import { MonacoBinding } from "y-monaco";
import { editor } from "monaco-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FileTreeComponent from "@/components/File/PrFileExplorer";
import SelectedFileViewer from "@/components/File/SelectedFileviewer/index";
import ConversationChatting from "@/pages/conversation/ConversationChatting";
import { PrFileNameViewer } from "@/components/File/PrSelectedFileVier/PrFileNameViewer";
import { PrFilePathViewer } from "@/components/File/PrSelectedFileVier/PrFilePathViewer";
import { PRBottomFileExplorer } from "@/components/File/PRBottomFileExplorer";
import { initFileStructSync } from "@/lib/yjs";
import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { chattingMessageStore } from "@/stores/chattingMessage.store";
import { ChattingSocketResponse } from "@/apis/conversation/dtos";

export const MainFrame = () => {
  const isMessage = chattingRoomStore((state) => state.isMessage);
  const selectedCommitFile = fileSysyemStore(
    (state) => state.selectedCommitFile,
  );
  const commitFileList = fileSysyemStore((state) => state.commitFileList);
  const clickedFileList = fileSysyemStore((state) => state.clickedFileList);
  const roomId = window.location.pathname.split("/")[1];
  const selectedTotalFilePath = selectedCommitFile.filename.split("/");
  const addMessage = chattingMessageStore((state) => state.addMessage);
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

  const provider = SocketManager.getInstance().yjsSocket.provider;
  const ydoc = SocketManager.getInstance().yjsSocket.ydoc;
  const socket = SocketManager.getInstance().socketIOSocket;

  useEffect(() => {
    const onChatting = (msg: {
      name: string;
      message: string;
      email: string;
      date: string;
    }) => {
      addMessage(new ChattingSocketResponse(msg));
    };
    socket.on("chatting", onChatting);
    return () => {
      socket.off("chatting", onChatting);
    };
  }, [socket, addMessage]);

  useEffect(() => {
    // sync 이벤트 핸들러 내부에서 파일 메타데이터 동기화
    initFileStructSync(ydoc, provider, commitFileList, initCommitFileList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, ydoc, roomId]);

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
    if (!editor || !selectedCommitFile) return;

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
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20}>
        {isMessage === "folder" ? (
          <FileTreeComponent />
        ) : (
          <ConversationChatting />
        )}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        {selectedCommitFile.filename !== "" && (
          <>
            <div className="flex w-full overflow-x-scroll border-b">
              {clickedFileList.map((file, index) => {
                return (
                  <PrFileNameViewer key={index} fileName={file.filename} />
                );
              })}
            </div>
            <PrFilePathViewer filePaths={selectedTotalFilePath} />
          </>
        )}
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel
            defaultSize={70}
            className="flex items-center justify-center"
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
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30}>
            <PRBottomFileExplorer />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
