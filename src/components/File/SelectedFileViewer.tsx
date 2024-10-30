import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CodeEditor, CodeSplitEditor } from "../CodeEditor";
import {
  PrChangedFileInfo,
  PrChangedFileStatusInfo,
} from "@/stores/github.store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";

interface SelectedFileProps {
  language: string;
  afterContent: string;
  beforeContent: string;
}

interface SelectedFileViewerProps extends PrChangedFileStatusInfo {
  selectedCommitFile: SelectedFileProps;
  commitFileList: PrChangedFileInfo[];
}

const SelectedFileViewer = ({
  status,
  selectedCommitFile,
  commitFileList,
}: SelectedFileViewerProps) => {
  const fileComponent: {
    [key in PrChangedFileStatusInfo["status"]]: React.ReactNode;
  } = {
    removed: <RemovedFile />,
    renamed: <RenamedFile />,
    added: <AddedFile selectedCommitFile={selectedCommitFile} />,
    modified: <ModifiedFile selectedCommitFile={selectedCommitFile} />,
    init: <InitFile commitFileList={commitFileList} />,
  };
  return fileComponent[status] || <div>invalue</div>;
};

const RemovedFile = () => {
  return (
    <Alert className="w-10/12 p-5">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="text-2xl">Removed File</AlertTitle>
      <AlertDescription className="text-xl">File Removed.</AlertDescription>
    </Alert>
  );
};

const RenamedFile = () => {
  return (
    <Alert className="w-10/12 p-5">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="text-2xl">Renamed File</AlertTitle>
      <AlertDescription className="text-xl">
        File renamed without changes.
      </AlertDescription>
    </Alert>
  );
};

const AddedFile = ({
  selectedCommitFile,
}: {
  selectedCommitFile: SelectedFileProps;
}) => {
  return (
    <CodeEditor
      language={selectedCommitFile.language}
      initialValue={selectedCommitFile.afterContent}
    />
  );
};

const ModifiedFile = ({
  selectedCommitFile,
}: {
  selectedCommitFile: SelectedFileProps;
}) => {
  return (
    <CodeSplitEditor
      language={selectedCommitFile.language}
      originalValue={selectedCommitFile.beforeContent}
      modifiedValue={selectedCommitFile.afterContent}
    />
  );
};

const InitFile = ({
  commitFileList,
}: {
  commitFileList: PrChangedFileInfo[];
}) => {
  return (
    <div className="flex w-4/5 flex-col">
      <div className="text-2xl">Init Page : file changed status</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">file additions</TableHead>
            <TableHead className="text-right">file deletions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commitFileList.map((file) => {
            return (
              <TableRow>
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
