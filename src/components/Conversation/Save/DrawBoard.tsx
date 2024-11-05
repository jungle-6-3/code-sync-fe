import { useFetcher } from "@/hooks/useFetcher";

interface ConversationSaveDrawBoardViewerProps {
  data: {
    url: string;
    isShared: boolean;
  };
}

const ConversationSaveDrawBoardViewer = ({
  data: { isShared, url },
}: ConversationSaveDrawBoardViewerProps) => {
  const { data } = useFetcher({ url });

  return (
    <div className="flex h-[400px] items-center justify-center">
      <p className="text-lg text-gray-400">DrawBoard</p>
    </div>
  );
};

export default ConversationSaveDrawBoardViewer;
