import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CodeEditor, CodeSplitEditor } from "../CodeEditor";
import {
  fileSysyemStore,
  PrChangedFileInfo,
  PrChangedFileStatusInfo,
} from "@/stores/github.store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/react";
import { DrawBoard } from "@/components/Draw/DrawBoard";

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
interface FileEditorProps {
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

  if (selectedCommitFile.filename === "MainDrawBoard") {
    return <DrawBoard />;
  }

  return fileComponent[status] || <div>invalue</div>;
};

const RemovedFile = () => {
  return (
    <Alert className="w-10/12 p-5">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="text-2xl">Removed File</AlertTitle>
      <AlertDescription>File Removed.</AlertDescription>
    </Alert>
  );
};

const RenamedFile = () => {
  return (
    <Alert className="w-10/12 p-5">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="text-2xl">Renamed File</AlertTitle>
      <AlertDescription>File renamed without changes.</AlertDescription>
    </Alert>
  );
};

const AddedFile = ({ selectedCommitFile, onEditorMount }: FileEditorProps) => {
  return (
    <CodeEditor
      language={selectedCommitFile.language}
      initialValue={selectedCommitFile.afterContent}
      onEditorMount={onEditorMount}
    />
  );
};

const ModifiedFile = ({
  selectedCommitFile,
  onSplitEditorMount,
}: FileEditorProps) => {
  return (
    <CodeSplitEditor
      language={selectedCommitFile.language}
      originalValue={selectedCommitFile.beforeContent}
      modifiedValue={selectedCommitFile.afterContent}
      onSplitEditorMount={onSplitEditorMount}
    />
  );
};

const InitFile = ({
  commitFileList,
}: {
  commitFileList: PrChangedFileInfo[];
}) => {
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );

  return (
    <div className="relative flex h-[55vh] w-full flex-col justify-center">
      <div className="mx-auto w-[90%] py-3 text-2xl font-semibold">
        File Changed
      </div>
      <Table className="m-auto w-[90%]">
        <TableHeader>
          <TableRow className="sticky top-0 bg-slate-200 hover:bg-slate-200">
            <TableHead className="w-[200px]">File Name</TableHead>
            <TableHead>language</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="text-right">file additions</TableHead>
            <TableHead className="text-right">file deletions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commitFileList.map((file, index) => {
            return (
              <TableRow
                key={index}
                className="cursor-pointer"
                onClick={() => setSelectedCommitFile(file)}
              >
                <TableCell className="font-medium">{file.filename}</TableCell>
                <TableCell>{file.language}</TableCell>
                <TableCell>{file.status}</TableCell>
                <TableCell className="text-right">{file.additions}</TableCell>
                <TableCell className="text-right">{file.deletions}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SelectedFileViewer;
