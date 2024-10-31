import FileTreeComponent from "@/components/File/PrFileExplorer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ConversationChatting from "@/pages/conversation/ConversationChatting";
import chattingRoomStore from "@/stores/chattingRoom.store";
import { fileSysyemStore, PrChangedFileInfo } from "@/stores/github.store";
import { useEffect, useMemo, useRef, useState } from "react";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import { editor } from "monaco-editor";
import SelectedFileViewer from "@/components/File/SelectedFileViewer";
import { DrawBoard } from "@/components/Draw/DrawBoard";
import { PrFileNameViewer } from "@/components/File/PrSelectedFileVier/PrFileNameViewer";
import { PrFilePathViewer } from "@/components/File/PrSelectedFileVier/PrFilePathViewer";
import { useTldrawStore } from "@/hooks/useTldrawStore";
import { PRBottomFileExplorer } from "@/components/File/PRBottomFileExplorer";

interface MainFrameProps {
  drawBoard: boolean;
}
export const MainFrame = ({ drawBoard }: MainFrameProps) => {
  const { isMessage } = chattingRoomStore();
  const { selectedCommitFile, commitFileList } = fileSysyemStore();
  const roomId = window.location.pathname.split("/")[1];
  const selectedFileName = selectedCommitFile.filename.split("/").at(-1);
  const selectedTotalFilePath = selectedCommitFile.filename
    .split("/")
    .join(" > ");

  const ydoc = useMemo(() => new Y.Doc(), []);
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const providerRef = useRef<WebsocketProvider | null>(null);
  const bindingRef = useRef<MonacoBinding | null>(null);
  const fileMetadata = ydoc.getArray<PrChangedFileInfo>("fileMetadata");

  const store = useTldrawStore({
    hostUrl: import.meta.env.VITE_YJS_URL,
    roomId,
  });

  // Provider 초기화
  useEffect(() => {
    if (!providerRef.current) {
      providerRef.current = new WebsocketProvider(
        import.meta.env.VITE_YJS_URL,
        // "wss://demos.yjs.dev/ws",
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
        {drawBoard && <DrawBoard store={store} />}
        {selectedCommitFile.filename !== "" && (
          <div>
            <PrFileNameViewer fileName={String(selectedFileName)} />
            <PrFilePathViewer filePath={selectedTotalFilePath} />
          </div>
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
