import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

interface ConversationShareSummaryViewerProps {
  data: string;
}

const ConversationShareSummaryViewer = ({
  data,
}: ConversationShareSummaryViewerProps) => {
  const editor = useCreateBlockNote();

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(data);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <>
      <div className="h-[calc(100vh-16rem)] py-2">
        <BlockNoteView
          editor={editor}
          sideMenu={true}
          theme="light"
          editable={false}
        />
      </div>
    </>
  );
};

export default ConversationShareSummaryViewer;
