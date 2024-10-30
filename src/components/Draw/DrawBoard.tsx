import { Tldraw, track, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import { useTldrawStore } from "@/hooks/useTldrawStore";
import { prMetaDataStore } from "@/stores/github.store";

const NameEditor = track(() => {
  const editor = useEditor();
  const name = prMetaDataStore((state) => state.prMetaData.owner);
  const { color } = editor.user.getUserPreferences();

  return (
    <div style={{ pointerEvents: "all", display: "flex" }}>
      <input
        type="color"
        value={color}
        onChange={(e) => {
          editor.user.updateUserPreferences({
            color: e.currentTarget.value,
          });
        }}
      />
      <input
        value={name}
        onChange={(e) => {
          editor.user.updateUserPreferences({
            name: e.currentTarget.value,
          });
        }}
      />
    </div>
  );
});

export const DrawBoard = ({ roomId }: { roomId: string }) => {
  const store = useTldrawStore({
    roomId,
    hostUrl: "wss://demos.yjs.dev/ws",
  });

  return (
    <div className="h-full w-full">
      <div className="tldraw__editor h-full w-full">
        <Tldraw
          autoFocus
          store={store}
          components={{
            SharePanel: NameEditor,
          }}
        />
      </div>
    </div>
  );
};
