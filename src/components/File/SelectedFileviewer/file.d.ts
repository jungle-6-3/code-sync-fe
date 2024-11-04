import {
  PrChangedFileInfo,
  PrChangedFileStatusInfo,
} from "@/stores/github.store";

export interface FileEditorProps {
  status?: PrChangedFileStatusInfo;
  selectedCommitFile: PrChangedFileInfo;
  onEditorMount?: (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => void;
  onSplitEditorMount?: (
    editor: editor.IStandaloneDiffEditor,
    monaco: Monaco,
  ) => void;
}

interface SelectedFileViewerProps {
    status: PrChangedFileStatusInfo["status"];
    selectedCommitFile: PrChangedFileInfo;
    commitFileList: PrChangedFileInfo[];
    onEditorMount?: (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => void;
    onSplitEditorMount?: (editor: editor.IStandaloneDiffEditor, monaco: Monaco) => void;
  }