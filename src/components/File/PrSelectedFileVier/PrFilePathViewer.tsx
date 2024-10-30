interface PrFilePathViewerProps {
  filePath: string;
}

export const PrFilePathViewer = ({ filePath }: PrFilePathViewerProps) => {
  return (
    <span className="item border-b- m-1 flex h-4 w-full items-center p-2">
      {filePath}
    </span>
  );
};
