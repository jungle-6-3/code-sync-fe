import { Tldraw, TldrawProps, track, useEditor } from "tldraw";
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

type DrawBoardProps = Pick<TldrawProps, "store">;

export const DrawBoard = ({ store }: DrawBoardProps) => {
  return (
    <div className="tldraw__editor h-full">
      <Tldraw
        autoFocus
        store={store}
        components={{
          SharePanel: NameEditor,
        }}
      />
    </div>
  );
};
