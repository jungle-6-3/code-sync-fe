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

interface SelectedFileProps {
  language: string;
  afterContent: string;
  beforeContent: string;
}

interface SelectedFileViewerProps extends PrChangedFileStatusInfo {
  selectedCommitFile: SelectedFileProps;
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
  selectedCommitFile: SelectedFileProps;
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
  return fileComponent[status] || <div>invalue</div>;
};

const RemovedFile = () => {
  return (
    <Alert className="w-10/12 p-5">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="text-2xl">Removed File</AlertTitle>
      <AlertDescription className="">File Removed.</AlertDescription>
    </Alert>
  );
};

const RenamedFile = () => {
  return (
    <Alert className="w-10/12 p-5">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="text-2xl">Renamed File</AlertTitle>
      <AlertDescription className="">
        File renamed without changes.
      </AlertDescription>
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
    <div className="flex w-4/5 flex-col">
      <div className="my-2 ml-2 text-2xl font-bold">
        File Changed List
      </div>
      <Table>
        <TableHeader>
          <TableRow className="">
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
                className="h-16 text-4xl"
                onClick={() => setSelectedCommitFile(file)}
              >
                <TableCell className="py-4  font-medium">
                  {file.filename}
                </TableCell>
                <TableCell className="py-4 ">{file.language}</TableCell>
                <TableCell className="py-4 ">{file.status}</TableCell>
                <TableCell className="py-4 text-right ">
                  {file.additions}
                </TableCell>
                <TableCell className="py-4 text-right ">
                  {file.deletions}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SelectedFileViewer;
