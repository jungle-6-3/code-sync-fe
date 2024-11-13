import { useEffect } from "react";
import { fileSysyemStore } from "@/stores/github.store";
import { editor } from "monaco-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FileTreeComponent from "@/components/File/PrFileExplorer";
import ConversationChatting from "@/components/Conversation/ConversationChatting";
import { RemoteCursorIndicator } from "@/lib/yjs";
import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import {
  chattingMessageStore,
  chattingPreviewStore,
} from "@/stores/chattingMessage.store";
import { ChattingSocketResponse } from "@/apis/conversation/dtos";
import { sectionSelectStore } from "@/stores/chattingRoom.store";
import useCheckUserQuery from "@/hooks/Users/useCheckUserQuery";
import MainTopFrom from "@/components/Frame/MainTopFrame";

export const MainFrame = () => {
  const leftSection = sectionSelectStore((state) => state.leftSection);
  const selectedCommitFile = fileSysyemStore(
    (state) => state.selectedCommitFile,
  );
  const roomId = window.location.pathname.split("/")[1];

  const addMessage = chattingMessageStore((state) => state.addMessage);
  const addPreviewMessage = chattingPreviewStore((state) => state.addMessage);

  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );

  if (!roomId) throw new Error("roomId is required");
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");

  const ydoc = SocketManager.getInstance().yjsSocket.ydoc;
  const socket = SocketManager.getInstance().socketIOSocket;
  const provider = SocketManager.getInstance().yjsSocket.provider;
  const { checkUser } = useCheckUserQuery();

  const otherUserSelectedCommitFile = fileSysyemStore(
    (state) => state.otherUserSelectedCommitFile,
  );
  const setOtherUserSelectedCommitFile = fileSysyemStore(
    (state) => state.setOtherUserSelectedCommitFile,
  );

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
        ([, state]) => state?.user && Object.keys(state).length > 0,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <MainTopFrom />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
