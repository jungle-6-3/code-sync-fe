import { useFetcher } from "@/hooks/useFetcher";

interface ConversationSaveNoteViewerProps {
  data: {
    url: string;
    isShared: boolean;
  };
}

const ConversationSaveNoteViewer = ({
  data: { isShared, url },
}: ConversationSaveNoteViewerProps) => {
  const { data } = useFetcher({ url });
  return (
    <div>
      <h1>Note Viewer</h1>
    </div>
  );
};

export default ConversationSaveNoteViewer;
