import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePreviouseRoomPatchMutate } from "@/hooks/Conversation/usePreviousRoomQuery";
import { usePreviousRoomStore } from "@/stores/previousRoom.store";
import { fromUint8Array } from "js-base64";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Y from "yjs";

interface ConversationSaveHeaderProps {
  initialTitle?: string;
}

const ydocToBase64 = (ydoc: Y.Doc) => {
  const documentState = Y.encodeStateAsUpdate(ydoc);
  const base64Encoded = fromUint8Array(documentState);
  return base64Encoded;
};

const ConversationSaveHeader = ({
  initialTitle,
}: ConversationSaveHeaderProps) => {
  const { postId } = useParams();
  if (!postId) throw new Error("postId is required");
  const { mutate: patchRoom } = usePreviouseRoomPatchMutate(postId);
  const noteYDoc = usePreviousRoomStore((state) => state.noteYdoc);
  const setNote = usePreviousRoomStore((state) => state.setNote);
  const drawBoardYDoc = usePreviousRoomStore((state) => state.drawBoardYdoc);
  const setDrawBoard = usePreviousRoomStore((state) => state.setDrawBoard);
  const navigate = useNavigate();

  const onPatchRoom = () => {
    const body: Record<string, { data?: string; isShared?: boolean }> = {};
    body["note"] = { data: ydocToBase64(noteYDoc) };
    body["drawBoard"] = { data: ydocToBase64(drawBoardYDoc) };

    patchRoom(body, {
      onError: () => {
        alert("저장에 실패했습니다.");
      },
      onSettled: () => {
        setNote("");
        setDrawBoard("");
        navigate("/room");
      },
    });
  };

  return (
    <div className="flex justify-between pb-6">
      <div className="flex items-center">
        <span className="min-w-12 text-lg">제목: </span>
        <Input defaultValue={initialTitle} />
      </div>
      <div className="flex gap-4">
        <Button variant="secondary">
          <Link to="/room">목록으로</Link>
        </Button>
        <Button onClick={onPatchRoom}>저장하기</Button>
      </div>
    </div>
  );
};

export default ConversationSaveHeader;
