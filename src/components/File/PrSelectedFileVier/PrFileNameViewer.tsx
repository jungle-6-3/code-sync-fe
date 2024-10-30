interface PrFileNameViewerProps {
  fileName: string;
}

export const PrFileNameViewer = ({ fileName }: PrFileNameViewerProps) => {
  return (
    <span className="item m-1 flex h-7 w-fit items-center border-b-4 border-blue-500 px-2 py-5">
      {fileName}
    </span>
  );
};
