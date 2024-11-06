import { useFetcher } from "@/hooks/useFetcher";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { toUint8Array } from "js-base64";
import * as Y from "yjs";

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
  const ydoc = new Y.Doc();
  const binaryEndcoed = toUint8Array(data.data);
  Y.applyUpdate(ydoc, binaryEndcoed);

  const editor = useCreateBlockNote({
    animations: false,
    collaboration: {
      fragment: ydoc.getXmlFragment("document-store"),
      provider: null,
      user: {
        name: "",
        color: "#ffffff",
      },
    },
  });

  return (
    <div className="h-[calc(100vh-12rem)] py-2">
      <BlockNoteView editor={editor} sideMenu={true} theme="light" />
    </div>
  );
};

export default ConversationSaveNoteViewer;
