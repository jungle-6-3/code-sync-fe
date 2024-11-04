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
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { drawBoardStore } from "@/stores/drawBoard.store";

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
  // DrawBoard 컴포넌트를 항상 마운트된 상태로 유지하되 숨김 처리
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

  return fileComponent[status] || <div>invalid</div>;
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

export const ModifiedFile = ({
  selectedCommitFile,
  onSplitEditorMount,
}: FileEditorProps) => {
  const [showDrawBoard, setShowDrawBoard] = useState(false);
  const setIsImageAdded = drawBoardStore((state) => state.setIsImageAdded);
  const elementRef = useRef<HTMLDivElement>(null);

  const htmlToImageConvert = () => {
    if (!elementRef.current) return;
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        // const link = document.createElement("a");
        // link.download = "my-image-name.png";
        // link.href = dataUrl;
        // link.click();
        sessionStorage.setItem("image", dataUrl);
        // console.log("dataUrl", dataUrl);
        // console.log("sessionstorage getitem", sessionStorage.getItem("image"));
        setIsImageAdded(true);
        setShowDrawBoard(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (showDrawBoard) return <DrawBoard />;
  return (
    <div className="flex h-full w-full">
      <div ref={elementRef} className="h-full w-full">
        <CodeSplitEditor
          language={selectedCommitFile.language}
          originalValue={selectedCommitFile.beforeContent}
          modifiedValue={selectedCommitFile.afterContent}
          onSplitEditorMount={onSplitEditorMount}
        />
      </div>
      <div className="h-[200px] w-[200px]">
        <button onClick={htmlToImageConvert}>html to image</button>
      </div>
    </div>
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
      <div className="text-2xl font-semibold">File Changed</div>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-200 hover:bg-slate-200">
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
