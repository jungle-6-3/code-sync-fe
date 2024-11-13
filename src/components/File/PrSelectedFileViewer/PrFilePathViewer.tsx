import { ChevronRightIcon } from "lucide-react";

interface PrFilePathViewerProps {
  filePaths: string[];
}

export const PrFilePathViewer = ({ filePaths }: PrFilePathViewerProps) => {
  return (
    <span className="flex w-full items-center border-b py-1 pl-2 text-sm">
      {filePaths.map((filePath, index) => {
        return (
          <span key={index} className="flex items-center">
            <span className="text-gray-500">{filePath}</span>
            {index !== filePaths.length - 1 && (
              <span className="text-gray-500">
                <ChevronRightIcon size="16" />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};
