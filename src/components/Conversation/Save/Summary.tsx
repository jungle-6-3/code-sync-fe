import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { usePreviousRoomStore } from "@/stores/previousRoom.store";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useCreateBlockNote } from "@blocknote/react";
import { Label } from "@/components/ui/label";

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): T {
  let timer: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }) as T;
}

interface ConversationSaveSummaryViewerProps {
  data: string;
}

const ConversationSaveSummaryViewer = ({
  data,
}: ConversationSaveSummaryViewerProps) => {
  const setSummary = usePreviousRoomStore((state) => state.setSummary);
  const summaryIsShared = usePreviousRoomStore(
    (state) => state.summaryIsShared,
  );
  const setSummaryIsShared = usePreviousRoomStore(
    (state) => state.setSummaryIsShared,
  );
  const editor = useCreateBlockNote();

  const debouncedSetSummary = debounce((markdown: string) => {
    setSummary(markdown);
  }, 500);

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
      <div className="mx-10 flex justify-end gap-4">
        <Label htmlFor="switch" className="text-sm font-light">
          {summaryIsShared ? "공개" : "비공개"}
        </Label>
        <Switch
          id="switch"
          checked={summaryIsShared}
          onCheckedChange={setSummaryIsShared}
        />
      </div>
      <div className="h-[calc(100vh-16rem)] py-2">
        <BlockNoteView
          editor={editor}
          sideMenu={true}
          theme="light"
          editable={true}
          onChange={async () => {
            const markdown = await editor.blocksToMarkdownLossy(
              editor.document,
            );
            debouncedSetSummary(markdown); // 디바운스된 함수로 저장
          }}
        />
      </div>
    </>
  );
};

export default ConversationSaveSummaryViewer;
