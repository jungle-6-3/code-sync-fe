import {
  PrChangedFileInfo,
  PrChangedFileStatusInfo,
} from "@/stores/github.store";
import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/react";
import { DrawBoard } from "@/components/Draw/DrawBoard";
import { InitFile } from "@/components/File/SelectedFile/InitFile";
import { BlockNote } from "@/components/BlockNote";
import { RemovedFile } from "./RemovedFile";
import { RenamedFile } from "./RenamedFile";
import { AddedFile } from "./AddedFile";
import { ModifiedFile } from "./ModifiedFile";

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

const SelectedFileViewer = ({
  status,
  selectedCommitFile,
  commitFileList,
  onEditorMount,
  onSplitEditorMount,
}: SelectedFileViewerProps) => {
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
  // BlockNote 파일일 때는 BlockNote 렌더링
  if (selectedCommitFile.filename === "BlockNote") {
    return <BlockNote />;
  }

  return <> {fileComponent[status] || <div>invalid</div>}</>;
};

export default SelectedFileViewer;
