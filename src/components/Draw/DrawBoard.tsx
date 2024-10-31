import { Tldraw, TldrawProps } from "tldraw";
import "tldraw/tldraw.css";

type DrawBoardProps = Pick<TldrawProps, "store">;

export const DrawBoard = ({ store }: DrawBoardProps) => {
  return (
    <div className="tldraw__editor h-full">
      <Tldraw autoFocus store={store} />
    </div>
  );
};
