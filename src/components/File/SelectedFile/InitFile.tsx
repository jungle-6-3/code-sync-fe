import { SyncButton } from "@/components/Conversation/SyncButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fileSysyemStore, PrChangedFileInfo } from "@/stores/github.store";

export const InitFile = ({
  commitFileList,
}: {
  commitFileList: PrChangedFileInfo[];
}) => {
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );

  return (
    <div className="third-step relative flex h-[55vh] w-full flex-col justify-center">
      <div className="absolute right-12 top-0">
        <SyncButton />
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
