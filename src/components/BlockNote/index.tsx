import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useCommunicationStore } from "@/stores/communicationState.store";
import "@blocknote/core/style.css";
import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";
import { SocketManager } from "@/lib/socketManager";
import useCheckUserQuery from "@/hooks/Users/useCheckUserQuery";

export function BlockNote() {
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");
  const { checkUser } = useCheckUserQuery();

  const yDoc = SocketManager.getInstance().yjsSocket.ydoc;
  const yProvider = SocketManager.getInstance().yjsSocket.provider;

  const editor = useCreateBlockNote({
    collaboration: {
      provider: yProvider,
      fragment: yDoc.getXmlFragment("document-store"),
      user: {
        name: checkUser?.data.name || "",
        color: "rgb(255, 102, 102)",
      },
    },
    animations: false,
  });

  if (!editor) {
    return <div>Error loading editor</div>;
  }

  return (
    <div className="h-full w-full">
      <BlockNoteView editor={editor} sideMenu={true} theme="light" />
    </div>
  );
}
