import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import { toUint8Array } from "js-base64";
import * as Y from "yjs";
import { usePreviousRoomStore } from "@/stores/previousRoom.store";
import { useEffect, useMemo, useReducer } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ConversationSaveNoteViewerProps {
  data: string;
}

const ConversationSaveNoteViewer = ({
  data,
}: ConversationSaveNoteViewerProps) => {
  const note = usePreviousRoomStore((state) => state.note);
  const setNote = usePreviousRoomStore((state) => state.setNote);
  const ydoc = usePreviousRoomStore((state) => state.noteYdoc);
  const noteIsShared = usePreviousRoomStore((state) => state.noteIsShared);
  const setNoteIsShared = usePreviousRoomStore(
    (state) => state.setNoteIsShared,
  );
  const [forceUpdateCount, forceUpdate] = useReducer((x) => x + 1, 0);
  const editor = useMemo(
    () =>
      BlockNoteEditor.create({
        animations: false,
        collaboration: {
          fragment: ydoc.getXmlFragment("document-store"),
          provider: null,
          user: {
            name: "",
            color: "#ffffff",
          },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [forceUpdateCount],
  );

  useEffect(() => {
    const initNoteUpdate = (_: Uint8Array, keys: string) => {
      if (keys === "server") forceUpdate();
    };
    if (note.length !== 0) {
      const binaryEncoded = toUint8Array(note);
      ydoc.on("update", initNoteUpdate);
      Y.applyUpdate(ydoc, binaryEncoded, "server");
    }
    return () => {
      ydoc.off("update", initNoteUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  useEffect(() => {
    if (note.length === 0) {
      setNote(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-10 flex justify-end gap-4">
        <Label htmlFor="switch" className="text-sm font-light">
          {noteIsShared ? "공개" : "비공개"}
        </Label>
        <Switch
          id="switch"
          checked={noteIsShared}
          onCheckedChange={setNoteIsShared}
        />
      </div>
      <div className="h-[calc(100vh-16rem)] py-2">
        <BlockNoteView editor={editor} sideMenu={true} theme="light" />
      </div>
    </>
  );
};

export default ConversationSaveNoteViewer;
