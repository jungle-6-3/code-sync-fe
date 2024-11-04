import { useEffect, useRef, useState, createContext } from "react";
import {
  fileSysyemStore,
  PrChangedFileInfo,
  PrChangedFileStatusInfo,
} from "@/stores/github.store";
import { drawBoardStore } from "@/stores/drawBoard.store";
import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/react";
import { DrawBoard } from "@/components/Draw/DrawBoard";
import { InitFile } from "@/components/File/SelectedFileviewer/InitFile";
import { AddedFile } from "./AddedFile";
import { RemovedFile } from "./RemovedFile";
import { RenamedFile } from "./RenamedFile";
import { ModifiedFile } from "./ModifiedFile";
import { toPng } from "html-to-image";
import { BlockNote } from "@/components/BlockNoteEditor";

interface SelectedFileViewerProps extends PrChangedFileStatusInfo {
  selectedCommitFile: PrChangedFileInfo;
  commitFileList: PrChangedFileInfo[];
  onEditorMount?: (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => void;
  onSplitEditorMount?: (
    editor: editor.IStandaloneDiffEditor,
    monaco: Monaco,
  ) => void;
}

interface BoardContextType {
  convertToImage: () => void;
}

export const BoardContext = createContext<BoardContextType>({
  convertToImage: () => {},
});

const SelectedFileViewer = ({
  status,
  selectedCommitFile,
  commitFileList,
  onEditorMount,
  onSplitEditorMount,
}: SelectedFileViewerProps) => {
  // DrawBoard 컴포넌트를 항상 마운트된 상태로 유지하되 숨김 처리
  const setIsImageAddedInfo = drawBoardStore(
    (state) => state.setIsAddedImageInfo,
  );
  const elementRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
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

  const contextValue = {
    convertToImage: () => {
      if (!elementRef.current) return;
      toPng(elementRef.current, { cacheBust: false })
        .then((dataUrl) => {
          sessionStorage.setItem("image", dataUrl);
          setIsImageAddedInfo({
            added: true,
            size: {
              width: size.width,
              height: size.height,
            },
          });
          setSelectedCommitFile({
            additions: 0,
            afterContent: "",
            beforeContent: "",
            deletions: 0,
            filename: "MainDrawBoard",
            language: "",
            status: "init",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    size,
  };

  const fileComponent: {
    [key in PrChangedFileStatusInfo["status"]]: React.ReactNode;
  } = {
    removed: <RemovedFile />,
    renamed: <RenamedFile />,
    added: (
      <AddedFile
        selectedCommitFile={selectedCommitFile}
        onEditorMount={onEditorMount}
      />
    ),
    modified: (
      <ModifiedFile
        selectedCommitFile={selectedCommitFile}
        onSplitEditorMount={onSplitEditorMount}
      />
    ),
    init: <InitFile commitFileList={commitFileList} />,
  };

  // MainDrawBoard 파일일 때는 DrawBoard만 렌더링
  if (selectedCommitFile.filename === "MainDrawBoard") {
    return <DrawBoard />;
  }
  // MainDrawBoard 파일일 때는 DrawBoard만 렌더링
  if (selectedCommitFile.filename === "BlockNote") {
    return <BlockNote />;
  }

  return (
    <BoardContext.Provider value={contextValue}>
      <div
        ref={elementRef}
        className="flex h-full w-full flex-col items-end justify-center"
      >
        {fileComponent[status] || <div>invalid</div>}
      </div>
    </BoardContext.Provider>
  );
};

export default SelectedFileViewer;
