import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { toUint8Array } from "js-base64";
import * as Y from "yjs";
import { usePreviousRoomStore } from "@/stores/previousRoom.store";
import { useEffect } from "react";

interface ConversationSaveNoteViewerProps {
  data: string;
}

const ConversationSaveNoteViewer = ({
  data,
}: ConversationSaveNoteViewerProps) => {
  const note = usePreviousRoomStore((state) => state.note);
  const setNote = usePreviousRoomStore((state) => state.setNote);
  const ydoc = usePreviousRoomStore((state) => state.noteYdoc);
  const yText = ydoc.getXmlFragment("document-store");

  useEffect(() => {
    if (note) {
      const binaryEncoded = toUint8Array(note);
      Y.applyUpdate(ydoc, binaryEncoded);
    }
  }, [note, ydoc]);

  useEffect(() => {
    if (!note) {
      setNote(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editor = useCreateBlockNote({
    animations: false,
    collaboration: {
      fragment: yText,
      provider: null,
      user: {
        name: "",
        color: "#ffffff",
      },
    },
  });

  return (
    <div className="h-[calc(100vh-16rem)] py-2">
      <BlockNoteView editor={editor} sideMenu={true} theme="light" />
    </div>
  );
};

export default ConversationSaveNoteViewer;
