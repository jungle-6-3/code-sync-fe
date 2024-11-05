import { useFetcher } from "@/hooks/useFetcher";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";

interface ConversationSaveNoteViewerProps {
  data: {
    url: string;
    isShared: boolean;
  };
}

const ConversationSaveNoteViewer = ({
  data: { url },
}: ConversationSaveNoteViewerProps) => {
  const { data } = useFetcher({ url });
  const editor = useCreateBlockNote({
    animations: false,
  });

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(data?.data || "");
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="h-[calc(100vh-12rem)] py-2">
      <BlockNoteView editor={editor} sideMenu={true} theme="light" />
    </div>
  );
};

export default ConversationSaveNoteViewer;
